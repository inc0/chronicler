from flask import Flask
from flask import request
from flask_restful import Resource, Api
from kubernetes import client, config
from flask_cors import CORS
from datetime import datetime
import json


app = Flask(__name__)
api = Api(app)
CORS(app)

config.load_incluster_config()

with open("/var/run/secrets/kubernetes.io/serviceaccount/namespace", "r") as f:
    namespace = f.read()

api_client = client.ApiClient()
custom_api = client.CustomObjectsApi(api_client)
deploy_api = client.AppsV1beta1Api(api_client)

class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)


class Inference(Resource):
    def get(self, model_name):
        return json.loads(json.dumps(deploy_api.list_namespaced_deployment(namespace=namespace, label_selector="model={}".format(model_name)).to_dict()['items'], cls=DateTimeEncoder))


api.add_resource(Inference, '/inference/<string:model_name>')


class Model(Resource):
    def get(self):
        group = "chronicler.org"
        version = "v1alpha1"
        plural = "models"
        models = custom_api.list_namespaced_custom_object(group, version, namespace, plural)['items']
        deploys = deploy_api.list_namespaced_deployment(namespace=namespace, label_selector="role=inference")
        inference_model_names = [d.metadata.labels['model'] for d in deploys.items]
        for m in models:
            if m["metadata"]["name"] in inference_model_names:
                m["status"] = "inference"
            else:
                m["status"] = "trained"
        return models



api.add_resource(Model, '/model/')
app.run(host="0.0.0.0")

import React from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import Paper from '@material-ui/core/Paper';

import Model from './Model';

const styles = theme => ({
  modelList: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


class ModelList extends React.Component {
  constructor() {
    super();
    this.state = {
      modelList: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/model/').then((res) => {
      console.log(res);
      this.setState({
        modelList: res.data
      });
    });
  }

  render() {
    return (
      <Paper className={this.props.classes.modelList}>
        <div className={this.props.classes.tableWrapper}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Model name</TableCell>
                <TableCell>Metrics</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.modelList.map((model, i) => {
                return (<Model model={model} key={i}/>)
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(ModelList);

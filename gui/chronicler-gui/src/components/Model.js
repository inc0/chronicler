import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ModelClickableCell from './ModelClickableCell';


const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 6,
  },
});

class Model extends React.Component {
  namePopover() {
      const sublistProps = {variant: "caption"};
      return(
        <List>
          <ListItem>
            <ListItemText>code: <a target="blank" href={"https://github.com/" + this.props.model.spec.code.github.repo + "/tree/" + this.props.model.spec.code.github.commit}>github</a></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>hyperparameters:</ListItemText>
          </ListItem>
          {this.props.model.spec.hyperparameters.map((h, i) => {
            return(
              <ListItem key={i} className={this.props.classes.nested}>
                <ListItemText primaryTypographyProps={sublistProps}>{h.name + ": " + h.value}</ListItemText>
              </ListItem>
            )
          })}
        </List>
      )
  }

  metricPopover() {
    return(
      this.props.model.spec.metrics.secondary.map((m,i) => {
        return(
          <Typography component="p" key={i}>
            {m.name + ": " + m.value}
          </Typography>
        )
    })
  )}

  render() {
    return (
      <TableRow>
        <TableCell>
          <ModelClickableCell
            primary={this.props.model.metadata.name}
            secondary={"v" + this.props.model.metadata.labels.version}
            popover={this.namePopover()}
          />
        </TableCell>
        <TableCell>
          <ModelClickableCell
            primary={this.props.model.spec.metrics.primary.value}
            secondary={this.props.model.spec.metrics.primary.name}
            popover={this.metricPopover()}
          />
        </TableCell>
        <TableCell>{this.props.model.status}</TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(Model);

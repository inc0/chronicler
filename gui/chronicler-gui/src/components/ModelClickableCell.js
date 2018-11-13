import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

class ModelClickableCell  extends React.Component {
  state = {
    anchorEl: null,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return(
      <div>
        <ListItem button onClick={this.handlePopoverOpen} aria-owns={open ? 'simple-popper' : undefined} aria-haspopup="true" style={{ padding: 0}}>
          <ListItemText primary={this.props.primary} secondary={this.props.secondary} />
        </ListItem>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Card>
            <CardContent>
             {this.props.popover}
            </CardContent>
          </Card>
        </Popover>
      </div>
    );
  }

}

export default withStyles(styles)(ModelClickableCell);

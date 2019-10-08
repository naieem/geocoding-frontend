import React, { Component } from 'react';
import './App.css';
import Map from "./components/map";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddMarkerDialog: false
    }
    this.handleAddMarkerDialog = this.handleAddMarkerDialog.bind(this);
  }
  handleAddMarkerDialog() {
    this.setState({
      openAddMarkerDialog: true
    });
  }
  render() {
    const {openAddMarkerDialog}=this.state;
    return (
      <div className="App">
        <Map></Map>
        <Button variant="contained" color="primary" onClick={this.handleAddMarkerDialog}>
          Hello World
      </Button>
        <Dialog open={openAddMarkerDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
          </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

export default App;

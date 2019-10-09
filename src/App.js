import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import Map from "./components/map";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Config from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddMarkerDialog: false,
      openDeleteMarkerDialog: false,
      action: "",
      address: "",
      errorMessage: "",
      hasError: false,
      markers: [],
      markerToBeDeleted: "",
      markerToBeEdited: "",
      deleteErrorMsg: ""
    }
    this.handleAddMarkerDialog = this.handleAddMarkerDialog.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAddMarkerRequest = this.handleAddMarkerRequest.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.listSingleMarkerData = this.listSingleMarkerData.bind(this);
    // this.addMarker=this.addMarker.bind(this);
    this.test=this.test.bind(this);
  }
  test(){
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve("hello");
      }, 4000);
    });
  }
  componentDidMount() {
    this.getAllMarker();
  }
  /**
   * get all market list
   */
  getAllMarker() {
    axios.get(Config.baseUrl + 'allMarker').then((response) => {
      if (response.data.status) {
        this.setState({
          markers: response.data.data
        });
      }
    });
  }
  /**
   * add market dialog hander
   */
  handleAddMarkerDialog() {
    this.setState({
      openAddMarkerDialog: true,
      action: 'add',
      address: ''
    });
  }
  handleAddressChange(event) {
    this.setState({ address: event.target.value });
  }
  /**
   * add/edit market request handler
   */
  handleAddMarkerRequest() {
    const { action, address, markerToBeEdited } = this.state;
    let data = {
      address: address
    }
    this.setState({
      hasError: false,
      errorMessage: ""
    });
    if (action === 'add')
      this.addMarker(data);
    if (action === 'edit') {
      data.itemId = markerToBeEdited;
      this.editMarker(data);
    }
  }
  /**
   * add marker handler
   */
  addMarker(data) {
    axios.post(Config.baseUrl + 'addMarker', data).then((response) => {
      if (!response.data.status) {
        this.setState({
          hasError: true,
          errorMessage: response.data.errorMessage.errmsg
        });
      } else {
        this.setState({
          address: '',
          openAddMarkerDialog: false
        });
        this.getAllMarker();
      }
      return response;
    });
  }
  /**
   * edit marker handler
   */
  editMarker(data) {
    axios.post(Config.baseUrl + 'updateMarker', data).then((response) => {
      
      if (!response.data.status) {
        this.setState({
          hasError: true,
          errorMessage: response.data.errorMessage
        });
      } else {
        this.onDialogClose();
        this.getAllMarker();
      }
    });
  }
  onDialogClose() {
    this.setState({ markerToBeDeleted: "", address: '', markerToBeEdited: "", action: '', openAddMarkerDialog: false, openDeleteMarkerDialog: false });
  }
  /**
   * delete marker handler
   * payload (itemid)
   */
  deleteMarker(id) {
    axios.post(Config.baseUrl + 'deleteMarker', { itemId: id }).then((response) => {
      if (response.data.status) {
        this.onDialogClose();
        this.getAllMarker();
      } else {
        this.setState({
          deleteErrorMsg: response.data.errorMessage
        });
      }
    });
  }
  /**
   * single marker display block
   */
  listSingleMarkerData(data) {
    return (
      <Grid item xs={12} sm={3} key={data._id}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {data.address}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Latitude: {data.latitude}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Longitude: {data.longitude}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="outlined" className="editMarker" onClick={() => this.setState({ markerToBeEdited: data._id, action: 'edit', openAddMarkerDialog: true, address: data.address })}>Edit</Button>
            <Button size="small" variant="outlined" onClick={() => this.setState({ markerToBeDeleted: data._id, openDeleteMarkerDialog: true })}>Delete</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
  render() {
    const { openAddMarkerDialog, action, address, openDeleteMarkerDialog, deleteErrorMsg, hasError, errorMessage, markers, markerToBeDeleted } = this.state;
    return (
      <div className="App">
        <Map markers={markers}></Map>
        <div className="container">
          <Button variant="contained" color="primary" className="addNewMarker" onClick={this.handleAddMarkerDialog}>
            Add new
          </Button>
          <Grid container spacing={2} style={{ marginTop: 20, width: '100%' }}>
            {markers.length > 0 && markers.map((marker) =>
              this.listSingleMarkerData(marker)
            )}
          </Grid>
        </div>
        {/* add/edit marker dialog */}
        <Dialog open={openAddMarkerDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            {action === 'add' && 'Add New Marker'}
            {action === 'edit' && 'Update Existing Marker'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please write address in the below text field to find its longitude and latitude.
            </DialogContentText>
            {hasError && <DialogContentText>
              {errorMessage}
            </DialogContentText>}
            <TextField
              autoFocus
              margin="dense"
              id="address"
              value={address}
              label="Address"
              type="text"
              onChange={this.handleAddressChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddMarkerRequest} color="primary" className={action == "add"? "addBtn" : (action == "edit"? "editBtn": "")}>
              {action === 'add' && 'Save'}
              {action === 'edit' && 'Update'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* delete dialog */}
        <Dialog
          open={openDeleteMarkerDialog}
        >
          <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete this marker?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onDialogClose} color="primary">
              No
            </Button>
            <Button onClick={() => this.deleteMarker(markerToBeDeleted)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

export default App;

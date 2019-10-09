import React from 'react';
import ReactDOM from 'react-dom';
import {
  shallow,
  configure,
  mount
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Map from "./components/map";

configure({
  adapter: new Adapter()
});

describe('<App />', () => {
  it('renders single Map components', () => {
    const component = shallow(<App />);
    expect(component.find(Map)).toHaveLength(1);
  });
});

describe('instance test', () => {
  it('testing instance', () => {
    const component = mount(<App />);
    const instance = component.instance();
    expect(instance).toBeInstanceOf(App)
  });
});

describe('State', () => {
  it('Testing State value', () => {
    const component = mount(<App />);
    expect(component.state().hasError).toBeFalsy();
    component.setState({
      hasError: true
    });
    expect(component.state().hasError).toBeTruthy();
  });
});

describe('Add Button', () => {
  it('To check if add marker button click is rendering the dom correctly', () => {
    const component = mount(<App />);
    expect(component.find('button.addBtn')).toHaveLength(0);
    component.find("button.addNewMarker").simulate('click');
    expect(component.state().action).toBe("add");
    expect(component.find('button.addBtn')).toHaveLength(1);
  });
});

describe('Edit Button', () => {
  it('To check if edit marker button click is rendering the dom correctly', () => {
    const component = mount(<App />);
    expect(component.find('button.editBtn')).toHaveLength(0);
    if (component.find("button.editMarker").length > 0) {
      component.find("button.editMarker").first().simulate('click');
      expect(component.state().action).toBe("edit");
      expect(component.state().markerToBeEdited).not.toBeNull();
      expect(component.find('button.editBtn')).toHaveLength(1);
    }
  });
});

describe('Add/Delete Marker DB Call', () => {
  it('To test DB call after add new Marker and then deleting the marker also', () => {
    const component = mount(<App />);
    const instance = component.instance();
    expect(component.find('button.addBtn')).toHaveLength(0);
    component.find("button.addNewMarker").simulate('click');
    expect(component.state().action).toBe("add");
    expect(component.find('button.addBtn')).toHaveLength(1);
    let data = {
      address: "comilla"
    };
    return instance.addMarker(data).then((response) => {
      expect(response).toBeDefined();
      expect(response.status).toBeTruthy();
      expect(response.itemId).toBeDefined();
      return instance.deleteMarker(response.itemId).then((res) => {
        expect(res).toBeTruthy();
      });
    });
  });
});
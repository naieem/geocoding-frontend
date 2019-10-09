import React from 'react';
import ReactDOM from 'react-dom';
import { shallow,configure,mount   } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import App from './App';
import Map from "./components/map";

configure({ adapter: new Adapter() });

// describe('Check if the whole DOM runs or not', () => {
//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<App />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
// });

describe('<App />', () => {
  it('renders single Map components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Map)).toHaveLength(1);
  });
});

describe('instance test', () => {
  it('testing instance', () => {
    const wrapper = mount(<App />);
    const instance= wrapper.instance();
    expect(instance).toBeInstanceOf(App)
  });
});

describe('State', () => {
  it('Testing State value', () => {
    const component = mount(<App />);
    expect(component.state().hasError).toBeFalsy();
    component.setState({hasError:true});
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
    if(component.find("button.editMarker").length > 0){
      component.find("button.editMarker").first().simulate('click');
      expect(component.state().action).toBe("edit");
      expect(component.state().markerToBeEdited).not.toBeNull();
      expect(component.find('button.editBtn')).toHaveLength(1);
    }
  });
});

// describe('Add Marker DB Call', () => {
//   it('To check if Db call is working fine or not', () => {
//     const component = mount(<App />);
//     const instance=component.instance();
//     // console.log(instance);
//     expect(component.find('button.addEditBtn')).toHaveLength(0);
//     component.find("button.addNewMarker").simulate('click');
//     expect(component.find('button.addEditBtn')).toHaveLength(1);
//     return instance.test().then((response)=>{
//       expect(response).toEqual("hello");
//     });
//     // expect(instance.test()).toEqual("hello");
//     // component.setState({address:"dhaka"});
//     // component.find("button.addEditBtn").simulate('click');
//   });
// });
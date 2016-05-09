import * as React from 'react';
import { shallow } from 'enzyme';
import { click } from './Helpers';
import StatefulComboBox from '../src/ComboBox';

import { ComboBox, List, ListItem, ListContainer, SearchBar, DropDownWrapper } from '../src/stateless/main';

describe('StatelessComboBox', () => {
    const data = [
        { text: "foo1", value: 1 },
        { text: "foo2", value: 2 },
        { text: "asd", value: 3 },
        { text: "dsa", value: 4 },
        { text: "foo5", value: 5 },
        { text: "foo6", value: 6 }
    ];

    const primitives = [ "foo", "bar", "baz" ];

    const filterData = (text) => {
        let dataList;

        if (text) {
            dataList = data.filter(function(item) {
                return item.text.indexOf(text) > -1;
            });
        } else {
            dataList = data;
        }

        return shallow(<ComboBox data={dataList} />);
    };

    let result;

    it('should render List', () => {
        result = shallow(<ComboBox data={data} />);
        expect(result.find(List).length).toEqual(1);
    });

    it('should render SearchBar', () => {
        result = shallow(<ComboBox data={data} />);
        expect(result.find(SearchBar).length).toEqual(1);
    });

    it('should render SearchBar', () => {
        result = shallow(<ComboBox data={data} />);
        expect(result.find(SearchBar).length).toEqual(1);
    });
});

describe('StatefulComboBox', () => {
    const data = [
        { text: "foo1", value: 1 },
        { text: "foo2", value: 2 },
        { text: "asd", value: 3 },
        { text: "dsa", value: 4 },
        { text: "foo5", value: 5 },
        { text: "foo6", value: 6 }
    ];

    const primitives = [ "foo", "bar", "baz" ];

    const filterData = (text) => {
        let dataList;

        if (text) {
            dataList = data.filter(function(item) {
                return item.text.indexOf(text) > -1;
            });
        } else {
            dataList = data;
        }

        return shallow(<ComboBox data={dataList} />);
    };

    let result;

    it('should render stateless StatefulComboBox', () => {
        result = shallow(<StatefulComboBox data={data} textField="text" valueField="value" />);
        expect(result.find(ComboBox).length).toEqual(1);
    });

    it('should accept value', () => {
        result = shallow(<StatefulComboBox data={data} textField="text" value={3} valueField="value" />);
        expect(result.state('dataItem')).toBe(data[2]);
        expect(result.state('focused')).toEqual(2);
        expect(result.state('selected')).toEqual(2);
        expect(result.state('text')).toEqual('asd');
        expect(result.state('value')).toEqual(3);
    });

    it('should accept value (primitives)', () => {
        result = shallow(<StatefulComboBox data={primitives} value="baz" />);
        expect(result.state('dataItem')).toEqual("baz");
        expect(result.state('focused')).toEqual(2);
        expect(result.state('selected')).toEqual(2);
        expect(result.state('text')).toEqual('baz');
        expect(result.state('value')).toEqual('baz');
    });

    it('should update state when item is selected from List', () => {
        result = shallow(<StatefulComboBox data={data} textField="text" valueField="value" />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        expect(result.state('dataItem')).toEqual(null);
        expect(result.state('value')).toEqual('');
        click(items.at(1).shallow());
        expect(result.state('dataItem')).toEqual(data[1]);
        expect(result.state('value')).toEqual(data[1].value);
    });

    it('should update state when item is selected from List (primitives)', () => {
        result = shallow(<StatefulComboBox data={primitives} />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        expect(result.state('dataItem')).toEqual(null);
        expect(result.state('value')).toEqual('');
        click(items.at(1).shallow());
        expect(result.state('dataItem')).toEqual(primitives[1]);
        expect(result.state('value')).toEqual(primitives[1]);
    });

    it('should fire change event when item selected from the list', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<StatefulComboBox data={data} onChange={spy} textField="text" valueField="value" />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        click(items.at(3).shallow());
        expect(spy).toHaveBeenCalledWith(data[3].value);
    });

    it('should fire change event when item selected from the list (primitives)', () => {
        const spy = jasmine.createSpy('spy');
        result = shallow(<StatefulComboBox data={primitives} onChange={spy} />);
        const items = result.find(ComboBox).shallow().find(List).shallow().find(ListItem);

        click(items.at(2).shallow());
        expect(spy).toHaveBeenCalledWith(primitives[2]);
    });
});

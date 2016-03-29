import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class ListContainer extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object, // eslint-disable-line
        visible: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    setHeight(height) {
        this.refs.wrapper.style.height = height;
    }

    render() {
        const containerClasses = classNames({
            'k-list-container': true,
            'k-popup': true,
            'k-group': true,
            'k-reset': true
        });

        const style = { ...this.props.style, display: this.props.visible ? "block" : "none" };

        return (
            <div className={containerClasses} ref="wrapper" style={style}>
                {this.props.children}
            </div>
        );
    }
}

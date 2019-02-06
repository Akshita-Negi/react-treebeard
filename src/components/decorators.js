'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';
import styled from '@emotion/styled';

const Div = styled('div', {
    shouldForwardProp: prop => ['className', 'children'].indexOf(prop) !== -1
})((({style}) => style));
const Polygon = styled('polygon', {
    shouldForwardProp: prop => ['className', 'children', 'points'].indexOf(prop) !== -1
})((({style}) => style));

const Loading = styled(({ className }) => {
    return <div className={className}>loading...</div>;
})(({ style }) => style);

Loading.propTypes = {
    style: PropTypes.object
};

const Toggle = (props) => {
    const {height, width} = props.style;
    const midHeight = height * 0.5;
    const points = `0,0 0,${height} ${width},${midHeight}`;

    return (
        <Div style={props.style.base}>
            <Div style={props.style.wrapper}>
                <svg height={height} width={width}>
                    <Polygon points={points}
                             style={props.style.arrow}/>
                </svg>
            </Div>
        </Div>
    );
};
Toggle.propTypes = {
    style: PropTypes.object
};

const Header = (props) => {
    return (
        <Div style={props.style.base}>
            <Div style={props.style.title}>
                {props.node.name}
            </Div>
        </Div>
    );
};
Header.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired
};

class Container extends React.Component {
    render() {
        const {style, decorators, terminal, onClick, node, extra} = this.props;

        return (
            <div onClick={onClick}
                 ref={ref => this.clickableRef = ref}
                 style={style.container}>
                {!terminal ? this.renderToggle() : null}

                <decorators.Header node={node}
                                   style={style.header}
                                   extra={extra}/>
            </div>
        );
    }

    renderToggle() {
        const {animations} = this.props;

        if (!animations) {
            return this.renderToggleDecorator();
        }

        return (
            <VelocityComponent animation={animations.toggle.animation}
                               duration={animations.toggle.duration}
                               ref={ref => this.velocityRef = ref}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }

    renderToggleDecorator() {
        const {style, decorators, extra} = this.props;

        return <decorators.Toggle style={style.toggle} extra={extra}/>;
    }
}
Container.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired
};

export default {
    Loading,
    Toggle,
    Header,
    Container
};

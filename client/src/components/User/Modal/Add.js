import React from 'react';
import {Icon, Button, Header, Modal, Form, Message} from 'semantic-ui-react';
import PropTypes from "prop-types";
import InlineError from '../../commons/InlineError'


class AddUser extends React.Component {

    state = {
        data: {
            username: '',
            author: ''
        },
        open: false,
        loading: false,
        errors:{}
    };

    close = () => this.setState({ open: false });

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    show = dimmer => () => this.setState({ dimmer, open: true });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({loading:true});
            this
                .props.submit(this.state.data)
                .catch(err => {
                    this.setState({errors: {global: err.response.data.message}});
                    this.setState({loading:false});
                })
                .finally(() => {
                    if (!this.state.errors.global) this.setState({open: false});
                    this.setState({loading:false});
                });
        }
    };

    validate = data => {
        const errors = {};

        if(!data.username) errors.username = "It's can't be blanck";
        if(!data.password) errors.password = "It's can't be blanck";

        return errors;
    };

    render() {
        const inlineStyle = {
            modal : {
                marginTop: '100px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        };
        const {data, errors, dimmer, open} = this.state;
        return (
            <div>
                <Button fluid icon labelPosition='left' primary size='small' onClick={this.show(true)}>
                        <Icon name='user' /> Add User
                      </Button>

                <Modal open={open} onClose={this.close} dimmer={dimmer} closeIcon style={inlineStyle.modal}>
                    <Header content="Add user"/>
                    <Modal.Content>
                        <Form
                            loading={this.state.loading}
                            onSubmit={this.onSubmit}>
                            {errors.global && <Message negative>
                                <Message.Header>Something went wrong</Message.Header>
                                <p>{errors.global}</p>
                            </Message>}
                            <Form.Field error={!!errors.username}>
                                <input type="text"
                                       id="username"
                                       name="username"
                                       placeholder="user name"
                                       value={data.name}
                                       onChange={this.onChange}
                                />
                                {errors.username && <InlineError text={errors.username}/>}
                            </Form.Field>
                            <Form.Field error={!!errors.password}>
                                <input type="text"
                                       id="password"
                                       name="password"
                                       placeholder="password"
                                       value={data.password}
                                       onChange={this.onChange}
                                />
                                {errors.password && <InlineError text={errors.password}/>}
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green'
                                disabled={this.state.loading}
                                onClick={this.onSubmit}>
                            <Icon name='checkmark'/>Add
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

AddUser.propTypes = {
    submit: PropTypes.func.isRequired
};


export default AddUser;
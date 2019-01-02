import React from 'react';
import {Icon, Button, Header, Modal, Form, Message} from 'semantic-ui-react';
import PropTypes from "prop-types";

class DeleteConfirm extends React.Component {
	state = {
        open: false,
        loading: false,
        errors:{}
    };

    close = () => this.setState({ open: false });

    show = dimmer => () => this.setState({ dimmer, open: true });

    onSubmit = () => {
            this.setState({loading:true});
            this
                .props.submit(this.state.data)
                .catch(err => {
                    this.setState({errors: {global: err.response.data.message}});
                    this.setState({loading:false});
                })
                .finally(() => {// Нужно проверять в finally блоке потому что код ассинхронный (catch может не успеть произойти до проверки)
                    if (!this.state.errors.global) this.setState({open: false});
                    this.setState({loading:false});
                });
    };

    render() {
        const inlineStyle = {
            modal : {
                marginTop: '100px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        };
        const {errors, dimmer, open} = this.state;
        const {color, enabled} = this.props;
        return (
            <div>
                <Button color={color} disabled={!enabled} onClick={this.show(true)}>Delete</Button>

                <Modal open={open} onClose={this.close} dimmer={dimmer} closeIcon style={inlineStyle.modal}>
                    <Header content="Confirm"/>
                    <Modal.Content>
                        <Form
                            loading={this.state.loading}
                            onSubmit={this.onSubmit}>
                            {errors.global && <Message negative>
                                <Message.Header>Something went wrong</Message.Header>
                                <p>{errors.global}</p>
                            </Message>}
                            <Form.Field >
                            	Are you shure?
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green'
                                disabled={this.state.loading}
                                onClick={this.onSubmit}>
                            <Icon name='checkmark'/> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

DeleteConfirm.propTypes = {
	color: PropTypes.string.isRequired,
	enabled: PropTypes.bool.isRequired,
	submit: PropTypes.func.isRequired
};
export default DeleteConfirm;
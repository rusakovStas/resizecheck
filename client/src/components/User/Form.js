import React from 'react';
import { Table, Container, Responsive } from 'semantic-ui-react'
import PropTypes from "prop-types";
import AddUser from "./Modal/Add"
import DeleteConfirm from "./Modal/Delete"

class UserForm extends React.Component {
	state={}

	render(){
		const inlineStyle = {
            container : {
                minHeight: '87vh' // i'm not understant this
            }
        };
		return(
			<Container style={inlineStyle.container}>
			 <Table attached='bottom' basic='very'>
			    <Table.Header fullWidth>
			      <Table.Row>
			        <Responsive as={Table.HeaderCell} {...Responsive.onlyMobile} textAlign='center'>
      					Users
    				</Responsive>
			        <Responsive as={Table.HeaderCell} {...Responsive.onlyComputer}>
      					User Name
    				</Responsive>
    				<Responsive as={Table.HeaderCell} {...Responsive.onlyComputer}>
      					Action
    				</Responsive>
			      </Table.Row>
			    </Table.Header>

			    <Table.Body>
			    {this.props.users.map(user =>
			    	<Table.Row key={user.user_id}>
			        <Table.Cell>{user.username}</Table.Cell>
			        <Table.Cell >
			        <DeleteConfirm
			        	color = 'red'
			        	submit = {() => this.props.delete(user)}
			        	enabled = {!!user.roles.find((element) => element.role !== 'admin')}
			        />
			        </Table.Cell>
			      </Table.Row>
			    )}
			    </Table.Body>

			    <Table.Footer fullWidth>
			      <Table.Row>
			        <Table.HeaderCell colSpan='4'>
			          <AddUser submit = {this.props.add}/>
			        </Table.HeaderCell>
			      </Table.Row>
			    </Table.Footer>
			  </Table>
			  </Container>
		);
	}
}

UserForm.propTypes = {
	delete: PropTypes.func.isRequired,
	add: PropTypes.func.isRequired,
	users: PropTypes.arrayOf(PropTypes.shape({
		user_id: PropTypes.number.isRequired,
		username: PropTypes.string.isRequired,
		roles: PropTypes.arrayOf(PropTypes.shape({
			role: PropTypes.string.isRequired
		})).isRequired
    })).isRequired
};

export default UserForm;
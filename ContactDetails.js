import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

class ContactDetails extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;

    return (
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header textAlign="center">
          <h1>Enter Contact Details</h1>
        </Header>

        <Form>
          <Segment>
            <Form.Field>
              <label>Primary Contact Name</label>
              <input
                placeholder="Primary Contact Name"
                onChange={this.props.handleChange('primaryContactName')}
                defaultValue={values.primaryContactName}
              />
            </Form.Field>

            <Form.Field>
              <label>Primary Contact Number</label>
              <input
                placeholder="Primary Contact Number"
                onChange={this.props.handleChange('primaryContactNumber')}
                defaultValue={values.primaryContactNumber}
              />
            </Form.Field>
          </Segment>

          <Segment textAlign="center">
            <Button onClick={this.back}>Back</Button>

            <Button onClick={this.saveAndContinue}>Save And Continue</Button>
          </Segment>
        </Form>
      </Grid.Column>
    );
  }
}

export default ContactDetails;

import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

class AccountDetails extends Component {
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
          <h1>Enter Account Details</h1>
        </Header>

        <Form>
          <Segment>
            <Form.Field>
              <label>Direct Debit Date</label>
              <input
                placeholder="Direct Debit Date"
                onChange={this.props.handleChange('directDebitDate')}
                defaultValue={values.directDebitDate}
              />
            </Form.Field>

            <Form.Field>
              <label>Payment Term Days</label>
              <input
                placeholder="Payment Term Days"
                onChange={this.props.handleChange('paymentTermDays')}
                defaultValue={values.paymentTermDays}
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

export default AccountDetails;

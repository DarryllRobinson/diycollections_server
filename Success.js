import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';

class Success extends Component {
  render() {
    return (
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header textAlign="center">
          <h1>Details Successfully Saved</h1>
        </Header>
      </Grid.Column>
    );
  }
}

export default Success;

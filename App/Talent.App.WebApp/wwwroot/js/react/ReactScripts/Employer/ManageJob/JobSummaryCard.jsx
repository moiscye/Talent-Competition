import React from "react";
import Cookies from "js-cookie";
import { Grid, Popup, Card, Button, Pagination } from "semantic-ui-react";
import moment from "moment";

export class JobSummaryCard extends React.Component {
  constructor(props) {
    super(props);
    this.selectJob = this.selectJob.bind(this);
  }

  selectJob(id) {
    var cookies = Cookies.get("talentAuthToken");
    //url: 'http://localhost:51689/listing/listing/closeJob',
  }

  render() {
    const { loadJobs } = this.props;
    //console.log(loadJobs);

    const cardData = loadJobs.map(job => (
      // <Grid.Column>
      <Card key={job.id}>
        <Card.Content>
          <Card.Header className="ui header">{job.title}</Card.Header>
          <Card.Meta className="ui header">
            {job.location.country}, {job.location.city}
          </Card.Meta>
          <Card.Description>{job.summary}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui  three buttons ">
            <Button negative content="Expired" />

            <div className="ui three buttons">
              <Button icon="ban" content="Close" basic color="blue" />
              <Button icon="edit" content="Edit" basic color="blue" />
              <Button icon="close" content="Copy" basic color="blue" />
            </div>
          </div>
        </Card.Content>
      </Card>
    ));

    return (
      <div>
        <Card.Group itemsPerRow={2}>{cardData}</Card.Group>
      </div>
    );
  }
}

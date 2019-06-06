import React from "react";
import { Grid, Pagination } from "semantic-ui-react";

const style = {
  float: "right"
};
export class JobPagination extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column />
            <Grid.Column>
              <Pagination
                boundaryRange={0}
                defaultActivePage={this.props.activePage}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={10}
                onPageChange={this.props.handlePaginationChange}
                style={style}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

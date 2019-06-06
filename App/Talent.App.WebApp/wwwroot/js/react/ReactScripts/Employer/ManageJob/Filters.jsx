import React from "react";
import { Form, Icon } from "semantic-ui-react";

const options = [
  { key: "a", text: "Active Jobs", value: "showActive" },
  { key: "c", text: "Closed Jobs", value: "showClosed" },
  { key: "e", text: "Expired Jobs", value: "showExpired" },
  { key: "u", text: "Unexpired Jobs", value: "showUnexpired" }
];

const optionsByDate = [
  { key: "a", text: "Newest First", value: "desc" },
  { key: "c", text: "Lastest First", value: "asc" }
];

export class Filters extends React.Component {
  constructor(props) {
    super(props);
    //this.selectJob = this.selectJob.bind(this);
  }
  render() {
    return (
      <div className="ui form">
        <Form size="large">
          <Form.Group inline>
            <Form.Field>
              <label>
                {" "}
                <Icon name="filter" />
                Filter
              </label>
              <Form.Select
                options={options}
                placeholder="Choose filter"
                onChange={this.props.handleFilterChange}
              />
            </Form.Field>
            <Form.Field>
              <label>
                {" "}
                <Icon name="calendar" />
                Sort by date
              </label>
              <Form.Select
                options={optionsByDate}
                placeholder="Newest First"
                onChange={this.props.handleCalendarChange}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

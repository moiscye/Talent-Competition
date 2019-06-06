import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import LoggedInBanner from "../../Layout/Banner/LoggedInBanner.jsx";
import { LoggedInNavigation } from "../../Layout/LoggedInNavigation.jsx";
import { JobSummaryCard } from "./JobSummaryCard.jsx";
import { Filters } from "./Filters.jsx";
import { BodyWrapper, loaderData } from "../../Layout/BodyWrapper.jsx";
import { JobPagination } from "./JobPagination.jsx";

export default class ManageJob extends React.Component {
  constructor(props) {
    super(props);
    let loader = loaderData;
    loader.allowedUsers.push("Employer");
    loader.allowedUsers.push("Recruiter");

    this.state = {
      loadJobs: [],
      loaderData: loader,
      activePage: 1,
      sortBy: {
        date: "desc"
      },
      filter: {
        showActive: true,
        showClosed: true,
        //showDraft: false,
        showExpired: true,
        showUnexpired: true
      },
      totalPages: 1,
      activeIndex: ""
    };
    this.loadData = this.loadData.bind(this);
    this.init = this.init.bind(this);
    this.loadNewData = this.loadNewData.bind(this);
    this.updateWithoutSave = this.updateWithoutSave.bind(this);
    //your functions go here
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  init() {
    let loaderData = TalentUtil.deepCopy(this.state.loaderData);
    loaderData.isLoading = false;
    this.setState({ loaderData });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    var link = "http://localhost:51689/listing/listing/getSortedEmployerJobs";
    var cookies = Cookies.get("talentAuthToken");
    // your ajax call and other logic goes here
    $.ajax({
      url: link,
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json"
      },
      data: {
        showActive: this.state.filter.showActive,
        showClosed: this.state.filter.showClosed,
        showDraft: this.state.filter.showDraft,
        showExpired: this.state.filter.showExpired,
        showUnexpired: this.state.filter.showUnexpired,
        sortbyDate: this.state.sortBy.date,
        activePage: this.state.activePage
      },
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      success: function(res) {
        let jobData = null;
        if (res.myJobs) {
          jobData = res.myJobs;
        }

        this.updateWithoutSave(jobData);
      }.bind(this),
      error: function(res) {}
    });
    this.init();
  }

  loadNewData(data) {
    var loader = this.state.loaderData;
    loader.isLoading = true;
    data[loaderData] = loader;
    this.setState(data, () => {
      this.loadData(() => {
        loader.isLoading = false;
        this.setState({
          loadData: loader
        });
      });
    });
  }

  updateWithoutSave(newData) {
    this.setState({
      loadJobs: newData
    });
  }

  handleFilterChange(e, { value }) {
    let filter = {};
    filter["showActive"] = true;
    filter["showClosed"] = true;
    filter["showExpired"] = true;
    filter["showUnexpired"] = true;
    filter[value] = false;
    this.setState({ filter: filter, activePage: 1 }, function() {
      this.loadData();
    });
  }
  handleCalendarChange(e, { value }) {
    let sortBy = {};
    sortBy["date"] = value;
    this.setState({ sortBy: sortBy, activePage: 1 }, function() {
      this.loadData();
    });
  }
  handlePaginationChange(e, { activePage }) {
    this.setState({ activePage: activePage }, function() {
      this.loadData();
    });
  }

  render() {
    let jobSummary = null;
    if (this.state.loadJobs.length > 0) {
      jobSummary = <JobSummaryCard loadJobs={this.state.loadJobs} />;
    } else {
      jobSummary = <h2>No Jobs Found!</h2>;
    }
    return (
      <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
        <div className="ui container">
          <h1>List of Jobs</h1>
          <Filters
            handleFilterChange={this.handleFilterChange}
            handleCalendarChange={this.handleCalendarChange}
          />
          {jobSummary}
          <JobPagination
            handlePaginationChange={this.handlePaginationChange}
            activePage={this.state.activePage}
          />
        </div>
      </BodyWrapper>
    );
  }
}

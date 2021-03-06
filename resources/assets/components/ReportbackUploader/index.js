import React from 'react';
import Block from '../Block';
import { Flex } from '../Flex';
import MediaUploader from '../MediaUploader';
import ReportbackSubmissions from '../ReportbackSubmissions';
import './reportback-uploader.scss';

class ReportbackUploader extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      media: this.defaultMediaState(),
      caption: null,
      impact: null,
      why_participated: null
    };
  }

  defaultMediaState() {
    return {
      file: null,
      filePreviewUrl: null
    }
  };

  onChange(media) {
    this.setState({ media })
  }

  onSubmit(event) {
    event.preventDefault();

    const reportback = {
      photo: this.state.media,
      caption: this.caption.value,
      impact: this.impact.value,
      why_participated: this.why_participated.value
    };

    this.props.submitReportback(reportback);

    // @TODO: only reset form AFTER successful RB submission.
    this.form.reset();
    this.setState({
      media: this.defaultMediaState()
    });
  }

  render() {
    return (
      <Block>
        <div className="reportback-uploader">
          <h2 className="heading">Upload your photos</h2>
          <form className="reportback-form" onSubmit={this.onSubmit} ref={(form) => this.form = form}>
            <MediaUploader label="Send us your photo" media={this.state.media} onChange={this.onChange} />

            <div className="wrapper">
              <div className="form-item">
                <label className="field-label" htmlFor="caption">Add a caption to your photo.</label>
                <input className="text-field" id="caption" name="caption" type="text" placeholder="Give it your best shot" ref={(input) => this.caption = input} />
              </div>

              <div>
                <label className="field-label" htmlFor="impact">How many jeans are in this photo?</label>
                <input className="text-field" id="impact" name="impact" type="text" placeholder="Enter # here -- like '300' or '5'" ref={(input) => this.impact = input} />
              </div>
            </div>

            <div className="form-item">
              <label className="field-label" htmlFor="why_participated">Why is this campaign important to you?</label>
              <textarea className="text-field" id="why_participated" name="why_participated" placeholder="No need to write an essay, but we'd love to see why this matters to you!" ref={(input) => this.why_participated = input}></textarea>
            </div>

            <button className="button" type="submit">Submit a new photo</button>
          </form>
        </div>

        <ReportbackSubmissions submissions={this.props.submissions}/>
      </Block>
    );
  }
}

export default ReportbackUploader;

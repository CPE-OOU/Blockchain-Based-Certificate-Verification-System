import React from 'react';

function Countdown() {
  return (
    <div className="row text-center">
    <div className="col-lg-6 mgb-l">
    <h4 className="title title-sm">Countdown to Exam:</h4>
      <div
        className="countdown countdown-s3"
        data-date="2023/11/23"
        data-min-text="Minutes"
        data-sec-text="Seconds"
      ></div>
    </div>
  
  </div>
  );
}

export default Countdown;

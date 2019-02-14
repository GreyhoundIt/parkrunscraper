import React from 'react'

class Results extends React.Component {
  render() {
    let output = {__html: 'First &middot; Second'} ;
    

    return (
      <div>
        <div dangerouslySetInnerHTML={output} />
      </div>
    );
  }
}

export default Results
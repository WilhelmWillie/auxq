import React from 'react';

const EmptyQueue = () => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <h1>This AuxQ is empty...</h1>

            <p className='lead'>Add more songs to the AuxQ and keep the party going!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyQueue;
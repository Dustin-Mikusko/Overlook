import chai from 'chai';
const expect = chai.expect;
import spies from "chai-spies";

import User from '../src/User';

chai.use(spies);

describe('User', () => {
  let user;

  it('should perform a fetch POST request to book a room', () => {
    user = new User(2, 'Rocio Schuster');
    let postSpy = chai.spy.on(global, 'fetch', () => {
      return new Promise((resolve, reject) => {
        resolve({message: 'Data has been fetched.'});
      })
    });
    user.bookRoom('2019/12/15', 13);
    expect(postSpy).to.have.been.called(1);
    chai.spy.restore(postSpy);
  })

})

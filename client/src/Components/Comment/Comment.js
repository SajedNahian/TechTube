import React from 'react';

export default function Comment() {
  return (
    <div className="comment">
      <img
        className="profile-picture"
        src="https://icon-library.net/images/no-profile-picture-icon/no-profile-picture-icon-13.jpg"
      />
      <div className="comment-body">
        <p>
          <a href="#">TheHappyMan12</a>
        </p>
        <p className="comment-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non porta
          augue. Nulla arcu dolor, faucibus scelerisque sagittis et, bibendum a
          tortor. Aenean facilisis efficitur auctor. Nunc leo dolor, porttitor
          non metus nec, ullamcorper blandit magna. Suspendisse sagittis nulla
          ut risus volutpat, a tincidunt felis ultricies.{' '}
        </p>
        <p>👍2 👎</p>
      </div>
    </div>
  );
}

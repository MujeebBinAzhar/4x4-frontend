/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/destructuring-assignment */
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    description?: string;
}

function Post(props: Props) {
    const { className, ...rootProps } = props;

    const rootClasses = classNames(className);

    return (
        <div className={rootClasses} {...rootProps}>
            <div className="post-view__card post">
                <div className="post__body typography">
                    <p dangerouslySetInnerHTML={{ __html: props?.description || '' }} />
                </div>
            </div>
        </div>
    );
}

export default Post;


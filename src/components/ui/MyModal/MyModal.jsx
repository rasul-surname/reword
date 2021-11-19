import React from 'react';
import s from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const classesMyModal = [s.myModal];
    const classesMyModalContent = [s.myModalContent];

    if(visible) {
        classesMyModal.push(s.active)
        classesMyModalContent.push(s.active)
    };

    return (
        <div className={classesMyModal.join(' ')} onClick={() => setVisible(false)}>
            <div className={classesMyModalContent.join(' ')} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
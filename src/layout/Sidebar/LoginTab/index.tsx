import React, { useEffect, useState } from 'react';
import styles from '../style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState, globalAction } from '@/store';
import { UserOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Modal, Input } from 'antd';
import { ILoginRequest, ILoginResult } from '@/apis/modules/types/user';

const LoginTab = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: IStoreState) => ({
        userInfo: state.global.userInfo,
    }));
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [loginObj, setLoginObj] = useState({
        phone: '',
        password: '',
    });
    useEffect(() => {
        if (userInfo) {
            //未登录
            // dispatch(globalAction.loginFun());
        }
    });
    const handleLoginClick = () => {
        setLoginModalVisible(false);
        dispatch(globalAction.loginFun(loginObj) as any);
    };
    return (
        <>
            <div className={styles.userLogin}>
                <div className={styles.avatarImg}>
                    {userInfo ? (
                        <img src={userInfo?.profile.avatarUrl} loading='lazy' />
                    ) : (
                        <UserOutlined style={{ fontSize: '30px' }} />
                    )}
                </div>
                {userInfo ? (
                    <div className={styles.userName}>
                        <span>{userInfo.profile.nickname}</span>
                    </div>
                ) : (
                    <div className={styles.userName} onClick={() => setLoginModalVisible(true)}>
                        <span>未登录</span>
                    </div>
                )}
                <CaretRightOutlined />
            </div>
            <Modal
                title='登录'
                visible={isLoginModalVisible}
                onOk={() => handleLoginClick()}
                onCancel={() => setLoginModalVisible(false)}
            >
                <Input
                    placeholder='手机号'
                    onChange={(e) =>
                        setLoginObj({
                            ...loginObj,
                            phone: e.target.value,
                        })
                    }
                    value={loginObj.phone}
                />
                <Input
                    placeholder='密码'
                    onChange={(e) =>
                        setLoginObj({
                            ...loginObj,
                            password: e.target.value,
                        })
                    }
                    value={loginObj.password}
                />
            </Modal>
        </>
    );
};

export default LoginTab;

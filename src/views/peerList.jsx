import React, { Component } from 'react';
import { Table } from 'antd';
import axios from 'axios';

class peerList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            peers: []
        }
    }

    getPeers() {
        axios({
            method: 'get',
            url: 'http://localhost:9998/api/getPeers',
            params: {
                page: 1,
                size: 50
            },
        })
        .then((response) => {
            console.log(response.data)
            const peers = response.data && response.data.map((item) => {
                item.key = 'peer-' + item.peerid;
                return item;
            })
            this.setState({
                peers: peers
            })
        });
    }

    componentDidMount() {
        this.getPeers()
    }


    render() {

        const peerColumns = [
            { title: 'peerid', dataIndex: 'peerid', key: 'peerid', width: 300 },
            { title: 'multiaddr', dataIndex: 'multiaddr', key: 'multiaddr' },
            { title: 'type', dataIndex: 'type', key: 'type', width: 100 },
        ];
        
        return (
            <div>
                <Table
                    bordered
                    scroll={{ y: 600 }}
                    columns={peerColumns}
                    dataSource={this.state.peers}
                />
            </div>
        )
    }
}

export default peerList;
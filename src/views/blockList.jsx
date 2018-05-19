import React, { Component } from 'react';
import { Table, Collapse, Modal } from 'antd';
import axios from 'axios';

const Panel = Collapse.Panel;


class blockList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blocks: [],
            records: [],
            visible: false
        }
    }

    getBlocks() {
        axios({
            method: 'get',
            url: 'http://localhost:9998/api/getBlocks',
            params: {
                page: 1,
                size: 50
            },
        })
        .then((response) => {
            console.log(response.data)
            const blocks = response.data && response.data.map((item) => {
                item.key = 'block-' + item.height;
                item.recordsCount = item.records.length;
                return item;
            })
            this.setState({
                blocks: blocks
            })
        });
    }

    componentDidMount() {
        this.getBlocks()
    }

    expandedBlockRow(block) {
        return (
            <Collapse defaultActiveKey={['1']}>
                <Panel header="blockhash" key="1">
                    <p>{block.blockhash}</p>
                </Panel>
                <Panel header="signature" key="2">
                    <p>{block.signature}</p>
                </Panel>
                <Panel header="merkle" key="3">
                    <p>{block.merkle}</p>
                </Panel>
                <Panel header="signature" key="4">
                    <p>{block.signature}</p>
                </Panel>
                <Panel header="publicKey" key="5">
                    <p>{block.publicKey}</p>
                </Panel>
            </Collapse>
        )
    }

    expandedRecordRow(record) {
        return (
            <Collapse defaultActiveKey={['hash']} >
                <Panel header="hash" key="hash">
                    <p>{record.hash}</p>
                </Panel>
                <Panel header="signature" key="signature">
                    <p>{record.signature}</p>
                </Panel>
                <Panel header="publicKey" key="publicKey">
                    <p>{record.publicKey}</p>
                </Panel>
            </Collapse>
        )
    }



    showModal = (block) => {
        const records = block.records.map((item, index) => {
            item.key = 'record-' + index;
            return item;
        });
        this.setState({
            visible: true,
            records: records
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
            records: []
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            records: []
        });
    }

    render() {
        const blockColumns = [
            { title: 'height', dataIndex: 'height', key: 'height', width: 100 },
            { title: 'version', dataIndex: 'version', key: 'version', width: 100 },
            { title: 'timestamp', dataIndex: 'timestamp', key: 'timestamp', width: 150 },
            { title: 'senderId', dataIndex: 'senderId', key: 'senderId', width: 300 },
            { title: 'recordsCount', dataIndex: 'recordsCount', key: 'recordsCount', width: 100 },
            { title: 'Action', dataIndex: '', key: 'x', width: 100,
                render: () => <a href="javascript:;">查看交易</a>,  
                onCellClick: this.showModal
            }
        ];

        const recordColumns = [
            { title: 'version', dataIndex: 'version', key: 'version', width: 100 },
            { title: 'timestamp', dataIndex: 'timestamp', key: 'timestamp', width: 150 },
            { title: 'message', dataIndex: 'message', key: 'message', width: 350 },
            { title: 'senderId', dataIndex: 'senderId', key: 'senderId', width: 200 },  
        ];


        return (
            <div>
                <Table
                    bordered
                    scroll={{ y: 500 }}
                    columns={blockColumns}
                    dataSource={this.state.blocks}
                    expandedRowRender={this.expandedBlockRow}
                />

                <Modal
                    title="records"
                    width="90%"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    wrapClassName="vertical-center-modal"
                >
                    <Table
                        bordered
                        pagination={false}
                        columns={recordColumns}
                        dataSource={this.state.records}
                        expandedRowRender={this.expandedRecordRow}
                        style={{ tableLayout: 'fixed', wordWrap: 'break-word', wordBreak: 'break-all' }}
            />
                </Modal>
            </div>
        )
    }
}

export default blockList;
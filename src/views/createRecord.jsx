import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button, Collapse } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const Panel = Collapse.Panel;




class createRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            record: null
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios({
                    method: 'post',
                    url: 'http://localhost:9998/api/createRecord',
                    data: {
                        message: values.message,
                    }
                })
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        record: response.data
                    })
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="">
                    <FormItem>
                        {getFieldDecorator('message', {
                            rules: [{ required: true, message: 'Please input your record message!' }],
                        })(
                            <TextArea rows={10} placeholder="record message" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            create Record
                        </Button>
                    </FormItem>
                </Form>

                <div style={{ textAlign: 'left', display: this.state.record ? 'block' : 'none' }} >
                    
                    <p style={{textAlign: 'center', fontSize: '1.5rem'}}>生成的record</p>

                    <Collapse defaultActiveKey={['timestamp']} >
                        <Panel header="timestamp" key="timestamp">
                            <p>{this.state.record && this.state.record.timestamp}</p>
                        </Panel>
                        <Panel header="version" key="version">
                            <p>{this.state.record && this.state.record.version}</p>
                        </Panel>
                        <Panel header="message" key="message">
                            <p>{this.state.record && this.state.record.message}</p>
                        </Panel>
                        <Panel header="senderId" key="senderId">
                            <p>{this.state.record && this.state.record.senderId}</p>
                        </Panel>
                        <Panel header="hash" key="hash">
                            <p>{this.state.record && this.state.record.hash}</p>
                        </Panel>
                        <Panel header="signature" key="signature">
                            <p>{this.state.record && this.state.record.signature}</p>
                        </Panel>
                        <Panel header="publicKey" key="publicKey">
                            <p>{this.state.record && this.state.record.publicKey}</p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        )
    }
}

createRecord = Form.create({})(createRecord);

export default createRecord;
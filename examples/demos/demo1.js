import React, { Component } from 'react';
import Pagination from '../../src';
export default class DEMO extends Component {

    state = {
        current: 1,
        pageSize: 10,
    }

    render() {

        const { current, pageSize } = this.state;

        return (
            <div>
                <Pagination
                    total={1000}
                    style={{
                        width: 260,
                        height: 300
                    }}
                />
                <br />
                <Pagination
                    total={1000}
                    current={100}
                    style={{
                        width: 260,
                        height: 300
                    }}
                />
                <br />
                <Pagination
                    total={1000}
                    current={current}
                    pageSize={pageSize}
                    onChange={num => this.setState({
                        current: num
                    })}
                    onPageSizeChange={(current, pageSize) => this.setState({
                        current,
                        pageSize
                    })}
                    style={{
                        width: 260,
                        height: 300
                    }}
                />
                <br />
                <Pagination
                    total={1000}
                    layout={['pager']}
                    style={{
                        width: 260,
                        height: 300
                    }}
                />
                <br />
                <Pagination
                    total={1000}
                    pageSize={50}
                    layout={[
                        'prev',
                        'next',
                        ({ total, pageSize, current }) => `当前显示：${(current - 1) * pageSize + 1} 到 ${current * pageSize} 条， 共 ${total} 条 `
                    ]}
                    style={{
                        width: 260,
                        height: 300
                    }}
                />
            </div >
        );
    }

}

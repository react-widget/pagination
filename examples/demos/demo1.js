import React, { Component } from "react";
import Pagination from "../../src";
export default class DEMO extends Component {
	state = {
		current: 1,
		pageSize: 10,
	};

	render() {
		const { current, pageSize } = this.state;

		return (
			<div>
				<Pagination total={1000} showSizeChanger showTotal showQuickJumper />
				<br />
				<Pagination
					total={1000}
					disabled
					defaultCurrent={20}
					showSizeChanger
					showTotal
					showQuickJumper
				/>
				<br />
				<Pagination total={1000} current={100} />
				<br />
				<Pagination
					total={1000}
					current={current}
					pageSize={pageSize}
					onChange={(num) =>
						this.setState({
							current: num,
						})
					}
					onPageSizeChange={(current, pageSize) =>
						this.setState({
							current,
							pageSize,
						})
					}
				/>
				<br />
				<Pagination total={1000} layout={["pager"]} />
				<br />
				<Pagination
					total={1000}
					pageSize={50}
					showTotal
					totalRender={({ range, total, current }) => {
						return `${range[0]}-${range[1]} of ${total} items`;
					}}
					layout={["prev", "next", "total"]}
				/>
			</div>
		);
	}
}

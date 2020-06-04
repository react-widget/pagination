import React from "react";
import classnames from "classnames";
import { getPageList } from "pagination-store";

export const version = "%VERSION%";

export type PaginationLayout = "total" | "sizeChanger" | "prev" | "pager" | "next" | "jumper";

export type ItemType = "page" | "prev" | "next" | "prevMore" | "nextMore";

export interface TotalRenderProps {
	page: number;
	total: number;
	pageSize: number;
	disabled: boolean;
	range: [number, number];
}

export interface SizeChangerProps {
	options: Array<number>;
	setPageSize: (pageSize: number) => void;
	pageSize: number;
	page: number;
	total: number;
	disabled: boolean;
}

export interface JumperProps {
	page: number;
	pageSize: number;
	total: number;
	setPage: (page: number) => void;
	disabled: boolean;
}

export function SizeChanger(props: SizeChangerProps) {
	return (
		<select
			value={props.pageSize}
			disabled={props.disabled}
			onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
				props.setPageSize(parseInt(e.target.value));
			}}
		>
			{props.options.map((size) => (
				<option key={size} value={size}>
					{size} 条/页
				</option>
			))}
		</select>
	);
}

export function Jumper(props: JumperProps) {
	const [value, setValue] = React.useState("");
	const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);
	const handleEnter = React.useCallback(
		(e: React.KeyboardEvent) => {
			if (e.keyCode === 13 && value) {
				setValue("");
				props.setPage(Math.abs(parseInt(value)) || 1);
			}
		},
		[value]
	);

	return (
		<>
			跳至
			<input
				value={value}
				disabled={props.disabled}
				onChange={handleChange}
				onKeyDown={handleEnter}
			/>
			页
		</>
	);
}

export interface PaginationProps {
	/** 样式前缀 */
	prefixCls?: string;
	/** 样式名称 */
	className?: string;
	/** 样式属性 */
	style?: React.CSSProperties;
	/** 数据总数：默认为：0 */
	total?: number;
	/** 当前页数(受控) */
	current?: number;
	/** 默认的当前页数 */
	defaultCurrent?: number;
	/** 每页条数(受控) */
	pageSize?: number;
	/** 默认的每页条数 */
	defaultPageSize?: number;
	/** 指定每页可以显示多少条 */
	pageSizeOptions?: Array<number>;
	/** 禁用分页 */
	disabled?: boolean;
	/** 只有一页时是否隐藏分页器 */
	hideOnSinglePage?: boolean;
	/** 是否展示 pageSize 选择器 */
	showSizeChanger?: boolean;
	/** 自定义渲染 pageSize 选择器 */
	sizeChangerRender?: (props: SizeChangerProps) => React.ReactNode;
	/** 是否显示快速跳转至某页输入框 */
	showQuickJumper?: boolean;
	/** 自定义渲染快速跳转至某页输入框 */
	quickJumperRender?: (props: JumperProps) => React.ReactNode;
	/** 是否显示总条数信息，默认：共 x 条，每页 y 条 */
	showTotal?: boolean;
	/** 自定义显示总条数信息 */
	totalRender?: (props: TotalRenderProps) => React.ReactNode;
	/** TODO: 是否显示页码提示: tips */
	// showTitle?: boolean;
	/** 显示页码数，默认为：5，该数值为奇数 */
	pageRange?: number;
	/** 自定义显示布局顺序及内置模块 */
	layout?: PaginationLayout[];
	/** 自定义渲染页码的内容 */
	itemRender?: (
		page: number,
		type: ItemType,
		originalElement: React.ReactNode
	) => React.ReactNode;
	/** 页数改变的回调 */
	onChange?: (page: number, pageSize: number) => void;
	/** 每页条数改变的回调 */
	onPageSizeChange?: (pageSize: number, page: number) => void;
}

export interface PaginationState {
	pageSize: number;
	current: number;
}

export class Pagination extends React.Component<PaginationProps, PaginationState> {
	static defaultProps: PaginationProps = {
		prefixCls: "rw-pagination",
		total: 0,
		hideOnSinglePage: false,
		showSizeChanger: false,
		pageSizeOptions: [10, 20, 50, 100],
		pageRange: 5,
		layout: ["total", "prev", "pager", "next", "sizeChanger", "jumper"],
		totalRender: function (props: TotalRenderProps) {
			return `共 ${props.total} 条，每页 ${props.pageSize} 条`;
		},
	};

	static getDerivedStateFromProps(props: PaginationProps, state: PaginationState) {
		return {
			current: props.current === undefined ? state.current : props.current,
			pageSize: props.pageSize === undefined ? state.pageSize : props.pageSize,
		};
	}

	state: Readonly<PaginationState> = {
		current: this.props.defaultCurrent || 1,
		pageSize: this.props.defaultPageSize || 10,
	};

	setPage(page: number) {
		const props = this.props;
		const { current, pageSize } = this.state;

		if (page === current || props.disabled) return;

		const pageCount = this.getTotalPages();

		page = Math.max(Math.min(page, pageCount), 1);

		if (props.current === undefined) {
			this.setState({
				current: page,
			});
		}

		if (props.onChange) props.onChange(page, pageSize);
	}

	prev = () => {
		this.setPage(this.state.current - 1);
	};

	next = () => {
		this.setPage(this.state.current + 1);
	};

	protected onItemEnter(callback: () => void, e: React.KeyboardEvent) {
		if (e.keyCode === 13) {
			callback();
		}
	}

	getTotalPages(pageSize = this.state.pageSize) {
		return Math.max(Math.ceil(this.props.total! / pageSize), 1);
	}

	getPageItemClassName(page: number) {
		const { prefixCls } = this.props;
		const { current } = this.state;
		const totalPages = this.getTotalPages();

		return classnames({
			[`${prefixCls}-item`]: true,
			[`${prefixCls}-item-number`]: true,
			[`${prefixCls}-item-first`]: page == 1,
			[`${prefixCls}-item-last`]: page == totalPages,
			[`${prefixCls}-item-active`]: current == page,
		});
	}

	setPageSize = (pageSize: number) => {
		const props = this.props;
		const { onPageSizeChange, disabled } = props;
		const { current } = this.state;

		if (pageSize === this.state.pageSize || disabled) return;

		const totalPages = this.getTotalPages(pageSize);

		const newCurrent = Math.min(current, totalPages);

		this.setPage(newCurrent);

		if (props.pageSize === undefined) {
			this.setState({
				pageSize: pageSize,
			});
		}

		if (onPageSizeChange) onPageSizeChange(pageSize, newCurrent);
	};

	protected renderPager() {
		const { pageSize, current } = this.state;
		const { total, prefixCls, pageRange, itemRender } = this.props;

		const pageList = getPageList({
			total: total!,
			current,
			pageRange,
			pageSize,
		});

		return pageList.map((item) => {
			const ellipsis = <span className={`${prefixCls}-icon-ellipsis`}>•••</span>;
			if (item.isPreviousMore) {
				const page = Math.max(current - pageRange!, 1);

				const more = (
					<>
						<span className={`${prefixCls}-icon-left`}>«</span>
						{ellipsis}
					</>
				);

				return (
					<div
						key="prev-more"
						tabIndex={0}
						className={`${prefixCls}-item ${prefixCls}-item-prev-more`}
						onClick={this.setPage.bind(this, page)}
					>
						{itemRender ? itemRender(page, "prevMore", more) : more}
					</div>
				);
			}

			if (item.isNextMore) {
				const page = Math.min(current + pageRange!, this.getTotalPages());
				const more = (
					<>
						<span className={`${prefixCls}-icon-right`}>»</span>
						{ellipsis}
					</>
				);

				return (
					<div
						key="next-more"
						tabIndex={0}
						className={`${prefixCls}-item ${prefixCls}-item-next-more`}
						onClick={this.setPage.bind(this, page)}
					>
						{itemRender ? itemRender(this.getTotalPages(), "nextMore", more) : more}
					</div>
				);
			}

			if (item.isCurrent) {
				return (
					<div key={item.page!} className={this.getPageItemClassName(item.page!)}>
						{itemRender ? itemRender(item.page!, "page", item.page) : item.page}
					</div>
				);
			}

			return (
				<div
					key={item.page!}
					tabIndex={0}
					className={this.getPageItemClassName(item.page!)}
					onClick={this.setPage.bind(this, item.page)}
					onKeyDown={this.onItemEnter.bind(this, this.setPage.bind(this, item.page))}
				>
					{itemRender ? itemRender(item.page!, "page", item.page) : item.page}
				</div>
			);
		});
	}

	getCurrentRange(): [number, number] {
		const { current, pageSize } = this.state;

		return [(current - 1) * pageSize + 1, current * pageSize];
	}

	protected renderLayoutTotal() {
		const { prefixCls, totalRender, total, showTotal, disabled } = this.props;
		const { current, pageSize } = this.state;

		return showTotal ? (
			<div key="total" className={`${prefixCls}-total-text`}>
				{totalRender!({
					page: current,
					pageSize,
					total: total!,
					disabled: !!disabled,
					range: this.getCurrentRange(),
				})}
			</div>
		) : null;
	}

	protected renderLayoutSizeChanger() {
		const {
			prefixCls,
			pageSizeOptions,
			showSizeChanger,
			sizeChangerRender,
			total,
			disabled,
		} = this.props;

		const sizeChangerProps: SizeChangerProps = {
			options: pageSizeOptions!,
			setPageSize: this.setPageSize,
			page: this.state.current,
			pageSize: this.state.pageSize,
			total: total!,
			disabled: !!disabled,
		};

		return showSizeChanger ? (
			<div key="changeSize" className={`${prefixCls}-size-changer`}>
				{sizeChangerRender ? (
					sizeChangerRender(sizeChangerProps)
				) : (
					<SizeChanger {...sizeChangerProps} />
				)}
			</div>
		) : null;
	}
	protected renderLayoutPrev() {
		const { prefixCls, itemRender } = this.props;
		const { current } = this.state;
		const isDisabled = current == 1;
		const className = classnames({
			[`${prefixCls}-item`]: true,
			[`${prefixCls}-prev`]: true,
			[`${prefixCls}-item-disabled`]: isDisabled,
		});

		return (
			<div
				key="prev"
				tabIndex={isDisabled ? undefined : 0}
				className={className}
				onClick={isDisabled ? undefined : this.prev}
				onKeyDown={isDisabled ? undefined : this.onItemEnter.bind(this, this.prev)}
			>
				{itemRender ? itemRender(0, "prev", "上一页") : "上一页"}
			</div>
		);
	}
	protected renderLayoutPager() {
		return this.renderPager();
	}
	protected renderLayoutNext() {
		const { prefixCls, itemRender } = this.props;
		const { current } = this.state;
		const totalPages = this.getTotalPages();
		const isDisabled = totalPages == current;
		const className = classnames({
			[`${prefixCls}-item`]: true,
			[`${prefixCls}-next`]: true,
			[`${prefixCls}-item-disabled`]: isDisabled,
		});

		return (
			<div
				key="next"
				tabIndex={isDisabled ? undefined : 0}
				className={className}
				onClick={isDisabled ? undefined : this.next}
				onKeyDown={isDisabled ? undefined : this.onItemEnter.bind(this, this.next)}
			>
				{itemRender ? itemRender(0, "next", "下一页") : "下一页"}
			</div>
		);
	}
	protected renderLayoutJumper() {
		const { prefixCls, quickJumperRender, showQuickJumper, total, disabled } = this.props;
		const { current, pageSize } = this.state;

		if (!showQuickJumper) return null;

		const jumperProps: JumperProps = {
			page: current,
			pageSize,
			total: total!,
			disabled: !!disabled,
			setPage: (page) => {
				this.setPage(page);
			},
		};

		return (
			<div key="jumper" className={`${prefixCls}-quick-jumper`}>
				{quickJumperRender ? quickJumperRender(jumperProps) : <Jumper {...jumperProps} />}
			</div>
		);
	}

	render() {
		const { prefixCls, className, layout, style, disabled, hideOnSinglePage } = this.props;

		if (hideOnSinglePage && this.getTotalPages() < 2) {
			return null;
		}

		const classes = classnames(
			{
				[`${prefixCls}`]: true,
				[`${prefixCls}-disabled`]: disabled,
			},
			className
		);

		return (
			<div className={classes} style={style}>
				{layout!.map((layout) => {
					switch (layout) {
						case "total":
							return this.renderLayoutTotal();
						case "prev":
							return this.renderLayoutPrev();
						case "pager":
							return this.renderLayoutPager();
						case "next":
							return this.renderLayoutNext();
						case "sizeChanger":
							return this.renderLayoutSizeChanger();
						case "jumper":
							return this.renderLayoutJumper();
						default:
							return null;
					}
				})}
			</div>
		);
	}
}

export default Pagination;

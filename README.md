# Pagination

Pagination分页组件

## 安装

`npm install --save react-widget-pagination`


## 使用

```js
import React from "react";
import Pagination from "react-widget-pagination";
import "react-widget-pagination/style";

export default function App() {
  return (
    <div
      className="App"
      style={{
        padding: 100
      }}
    >
        <Pagination total={1000} showSizeChanger showTotal showQuickJumper />
    </div>
  );
}


```


### Interfaces

```ts
import React from "react";
export declare type PaginationLayout = "total" | "sizeChanger" | "prev" | "pager" | "next" | "jumper";
export declare type ItemType = "page" | "prev" | "next" | "prevMore" | "nextMore";
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
export declare function SizeChanger(props: SizeChangerProps): JSX.Element;
export declare function Jumper(props: JumperProps): JSX.Element;
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
    /** 显示页码数，默认为：5，该数值为奇数 */
    pageRange?: number;
    /** 自定义显示布局顺序及内置模块 */
    layout?: PaginationLayout[];
    /** 自定义渲染页码的内容 */
    itemRender?: (page: number, type: ItemType, originalElement: React.ReactNode) => React.ReactNode;
    /** 页数改变的回调 */
    onChange?: (page: number, pageSize: number) => void;
    /** 每页条数改变的回调 */
    onPageSizeChange?: (pageSize: number, page: number) => void;
}
export interface PaginationState {
    pageSize: number;
    current: number;
}
export declare class Pagination extends React.Component<PaginationProps, PaginationState> {
    static defaultProps: PaginationProps;
    static getDerivedStateFromProps(props: PaginationProps, state: PaginationState): {
        current: number;
        pageSize: number;
    };
    state: Readonly<PaginationState>;
    setPage(page: number): void;
    prev: () => void;
    next: () => void;
    protected onItemEnter(callback: () => void, e: React.KeyboardEvent): void;
    getTotalPages(pageSize?: number): number;
    getPageItemClassName(page: number): any;
    setPageSize: (pageSize: number) => void;
    protected renderPager(): JSX.Element[];
    getCurrentRange(): [number, number];
    protected renderLayoutTotal(): JSX.Element | null;
    protected renderLayoutSizeChanger(): JSX.Element | null;
    protected renderLayoutPrev(): JSX.Element;
    protected renderLayoutPager(): JSX.Element[];
    protected renderLayoutNext(): JSX.Element;
    protected renderLayoutJumper(): JSX.Element | null;
    render(): JSX.Element | null;
}
export default Pagination;

```

### defaultProps
```js
{
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

}
```

### 基础样式

```css
.rw-pagination {
	display: flex;
	align-items: center;
}

.rw-pagination > div:not(:last-child) {
	margin-right: 6px;
}

.rw-pagination-item {
	padding: 5px 10px;
	user-select: none;
	background: #fff;
	border: 1px solid #d9d9d9;
	outline: 0;
	border-radius: 2px;
	cursor: pointer;
	line-height: 20px;
}

.rw-pagination-item-next-more,
.rw-pagination-item-prev-more {
	font-size: 12px;
}

.rw-pagination-icon-left,
.rw-pagination-icon-right {
	display: none;
}

.rw-pagination-item:focus,
.rw-pagination-item:hover {
	border-color: #40a9ff;
}

.rw-pagination-item:active {
	background-color: #eaeaea;
	border-color: #dcdee0;
}

.rw-pagination-item-disabled,
.rw-pagination-item-disabled:active {
	color: rgba(0, 0, 0, 0.25);
	border-color: #d9d9d9;
	background-color: #fff;
	cursor: not-allowed;
}

.rw-pagination-item-disabled:hover {
	border-color: #d9d9d9;
}

.rw-pagination-item-active,
.rw-pagination-item-active:active {
	background: #40a9ff;
	color: #fff;
	border-color: #40a9ff;
	cursor: default;
}

.rw-pagination-quick-jumper input {
	width: 45px;
	margin: 0 6px;
	padding: 5px 10px;
	border-radius: 2px;
	border: 1px solid #d9d9d9;
}

.rw-pagination-size-changer select {
	padding: 5px 10px;
	border-radius: 2px;
	border: 1px solid #d9d9d9;
}

.rw-pagination-disabled .rw-pagination-item {
	background: #f5f5f5;
	border-color: #d9d9d9;
	cursor: not-allowed;
}

.rw-pagination-disabled .rw-pagination-item-active {
	background: #dbdbdb;
	border-color: transparent;
}


```

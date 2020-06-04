import React from "react";
import classnames from "classnames";
import { getPageList } from "pagination-store";
export const version = "%VERSION%";
export function SizeChanger(props) {
    return (React.createElement("select", { value: props.pageSize, disabled: props.disabled, onChange: (e) => {
            props.setPageSize(parseInt(e.target.value));
        } }, props.options.map((size) => (React.createElement("option", { key: size, value: size },
        size,
        " \u6761/\u9875")))));
}
export function Jumper(props) {
    const [value, setValue] = React.useState("");
    const handleChange = React.useCallback((e) => {
        setValue(e.target.value);
    }, []);
    const handleEnter = React.useCallback((e) => {
        if (e.keyCode === 13 && value) {
            setValue("");
            props.setPage(Math.abs(parseInt(value)) || 1);
        }
    }, [value]);
    return (React.createElement(React.Fragment, null,
        "\u8DF3\u81F3",
        React.createElement("input", { value: value, disabled: props.disabled, onChange: handleChange, onKeyDown: handleEnter }),
        "\u9875"));
}
let Pagination = /** @class */ (() => {
    class Pagination extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                current: this.props.defaultCurrent || 1,
                pageSize: this.props.defaultPageSize || 10,
            };
            this.prev = () => {
                this.setPage(this.state.current - 1);
            };
            this.next = () => {
                this.setPage(this.state.current + 1);
            };
            this.setPageSize = (pageSize) => {
                const props = this.props;
                const { onPageSizeChange, disabled } = props;
                const { current } = this.state;
                if (pageSize === this.state.pageSize || disabled)
                    return;
                const totalPages = this.getTotalPages(pageSize);
                const newCurrent = Math.min(current, totalPages);
                this.setPage(newCurrent);
                if (props.pageSize === undefined) {
                    this.setState({
                        pageSize: pageSize,
                    });
                }
                if (onPageSizeChange)
                    onPageSizeChange(pageSize, newCurrent);
            };
        }
        static getDerivedStateFromProps(props, state) {
            return {
                current: props.current === undefined ? state.current : props.current,
                pageSize: props.pageSize === undefined ? state.pageSize : props.pageSize,
            };
        }
        setPage(page) {
            const props = this.props;
            const { current, pageSize } = this.state;
            if (page === current || props.disabled)
                return;
            const pageCount = this.getTotalPages();
            page = Math.max(Math.min(page, pageCount), 1);
            if (props.current === undefined) {
                this.setState({
                    current: page,
                });
            }
            if (props.onChange)
                props.onChange(page, pageSize);
        }
        onItemEnter(callback, e) {
            if (e.keyCode === 13) {
                callback();
            }
        }
        getTotalPages(pageSize = this.state.pageSize) {
            return Math.max(Math.ceil(this.props.total / pageSize), 1);
        }
        getPageItemClassName(page) {
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
        renderPager() {
            const { pageSize, current } = this.state;
            const { total, prefixCls, pageRange, itemRender } = this.props;
            const pageList = getPageList({
                total: total,
                current,
                pageRange,
                pageSize,
            });
            return pageList.map((item) => {
                const ellipsis = React.createElement("span", { className: `${prefixCls}-icon-ellipsis` }, "\u2022\u2022\u2022");
                if (item.isPreviousMore) {
                    const page = Math.max(current - pageRange, 1);
                    const more = (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: `${prefixCls}-icon-left` }, "\u00AB"),
                        ellipsis));
                    return (React.createElement("div", { key: "prev-more", tabIndex: 0, className: `${prefixCls}-item ${prefixCls}-item-prev-more`, onClick: this.setPage.bind(this, page) }, itemRender ? itemRender(page, "prevMore", more) : more));
                }
                if (item.isNextMore) {
                    const page = Math.min(current + pageRange, this.getTotalPages());
                    const more = (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: `${prefixCls}-icon-right` }, "\u00BB"),
                        ellipsis));
                    return (React.createElement("div", { key: "next-more", tabIndex: 0, className: `${prefixCls}-item ${prefixCls}-item-next-more`, onClick: this.setPage.bind(this, page) }, itemRender ? itemRender(this.getTotalPages(), "nextMore", more) : more));
                }
                if (item.isCurrent) {
                    return (React.createElement("div", { key: item.page, className: this.getPageItemClassName(item.page) }, itemRender ? itemRender(item.page, "page", item.page) : item.page));
                }
                return (React.createElement("div", { key: item.page, tabIndex: 0, className: this.getPageItemClassName(item.page), onClick: this.setPage.bind(this, item.page), onKeyDown: this.onItemEnter.bind(this, this.setPage.bind(this, item.page)) }, itemRender ? itemRender(item.page, "page", item.page) : item.page));
            });
        }
        getCurrentRange() {
            const { current, pageSize } = this.state;
            return [(current - 1) * pageSize + 1, current * pageSize];
        }
        renderLayoutTotal() {
            const { prefixCls, totalRender, total, showTotal, disabled } = this.props;
            const { current, pageSize } = this.state;
            return showTotal ? (React.createElement("div", { key: "total", className: `${prefixCls}-total-text` }, totalRender({
                page: current,
                pageSize,
                total: total,
                disabled: !!disabled,
                range: this.getCurrentRange(),
            }))) : null;
        }
        renderLayoutSizeChanger() {
            const { prefixCls, pageSizeOptions, showSizeChanger, sizeChangerRender, total, disabled, } = this.props;
            const sizeChangerProps = {
                options: pageSizeOptions,
                setPageSize: this.setPageSize,
                page: this.state.current,
                pageSize: this.state.pageSize,
                total: total,
                disabled: !!disabled,
            };
            return showSizeChanger ? (React.createElement("div", { key: "changeSize", className: `${prefixCls}-size-changer` }, sizeChangerRender ? (sizeChangerRender(sizeChangerProps)) : (React.createElement(SizeChanger, Object.assign({}, sizeChangerProps))))) : null;
        }
        renderLayoutPrev() {
            const { prefixCls, itemRender } = this.props;
            const { current } = this.state;
            const isDisabled = current == 1;
            const className = classnames({
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-prev`]: true,
                [`${prefixCls}-item-disabled`]: isDisabled,
            });
            return (React.createElement("div", { key: "prev", tabIndex: isDisabled ? undefined : 0, className: className, onClick: isDisabled ? undefined : this.prev, onKeyDown: isDisabled ? undefined : this.onItemEnter.bind(this, this.prev) }, itemRender ? itemRender(0, "prev", "上一页") : "上一页"));
        }
        renderLayoutPager() {
            return this.renderPager();
        }
        renderLayoutNext() {
            const { prefixCls, itemRender } = this.props;
            const { current } = this.state;
            const totalPages = this.getTotalPages();
            const isDisabled = totalPages == current;
            const className = classnames({
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-next`]: true,
                [`${prefixCls}-item-disabled`]: isDisabled,
            });
            return (React.createElement("div", { key: "next", tabIndex: isDisabled ? undefined : 0, className: className, onClick: isDisabled ? undefined : this.next, onKeyDown: isDisabled ? undefined : this.onItemEnter.bind(this, this.next) }, itemRender ? itemRender(0, "next", "下一页") : "下一页"));
        }
        renderLayoutJumper() {
            const { prefixCls, quickJumperRender, showQuickJumper, total, disabled } = this.props;
            const { current, pageSize } = this.state;
            if (!showQuickJumper)
                return null;
            const jumperProps = {
                page: current,
                pageSize,
                total: total,
                disabled: !!disabled,
                setPage: (page) => {
                    this.setPage(page);
                },
            };
            return (React.createElement("div", { key: "jumper", className: `${prefixCls}-quick-jumper` }, quickJumperRender ? quickJumperRender(jumperProps) : React.createElement(Jumper, Object.assign({}, jumperProps))));
        }
        render() {
            const { prefixCls, className, layout, style, disabled, hideOnSinglePage } = this.props;
            if (hideOnSinglePage && this.getTotalPages() < 2) {
                return null;
            }
            const classes = classnames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-disabled`]: disabled,
            }, className);
            return (React.createElement("div", { className: classes, style: style }, layout.map((layout) => {
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
            })));
        }
    }
    Pagination.defaultProps = {
        prefixCls: "rw-pagination",
        total: 0,
        hideOnSinglePage: false,
        showSizeChanger: false,
        pageSizeOptions: [10, 20, 50, 100],
        pageRange: 5,
        layout: ["total", "prev", "pager", "next", "sizeChanger", "jumper"],
        totalRender: function (props) {
            return `共 ${props.total} 条，每页 ${props.pageSize} 条`;
        },
    };
    return Pagination;
})();
export { Pagination };
export default Pagination;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Select(props) {

    return (
        <select
            className={props.className}
            value={props.value}
            onChange={e => {
                props.onChange(e.target.value)
            }}
        >
            {props.options.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
    );
}

export default class Pagination extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        small: PropTypes.bool,
        total: PropTypes.number.isRequired,
        defaultCurrent: PropTypes.number,
        current: PropTypes.number,
        defaultPageSize: PropTypes.number,
        pageSize: PropTypes.number,
        pageRange: PropTypes.number,
        pageSizeOptions: PropTypes.array,
        onPageSizeChange: PropTypes.func,
        onChange: PropTypes.func,
        layout: PropTypes.array,
        totalRender: PropTypes.func,
        prevBtnRender: PropTypes.func,
        nextBtnRender: PropTypes.func,
        itemRender: PropTypes.func,
        pageSizeOptionRender: PropTypes.func,
        jumperRender: PropTypes.func,
        showPrevMore: PropTypes.bool,
        showNextMore: PropTypes.bool,
        selectComponent: PropTypes.any,
    };

    static defaultProps = {
        prefixCls: 'rw-pagination',
        small: false,
        total: 0,
        showSizeChanger: false,
        pageSizeOptions: [10, 20, 30, 40],
        pageRange: 5,//必须是奇数，界面上最多显示7页
        //total, sizes, prev, pager, next, jumper
        layout: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
        totalRender: function (total, pn, ps) {
            return `共 ${total} 条`;
        },
        pageSizeOptionRender: function (v) {
            return `${v} 条/页`;
        },
        jumperRender: null,
        prevBtnRender: () => '上一页',
        nextBtnRender: () => '下一页',
        itemRender: null,
        showPrevMore: true,
        showNextMore: true,
        selectComponent: Select,
    };

    static getDerivedStateFromProps(props, state) {
        return {
            current: Math.max(props.current || state.current, 1),
            pageSize: props.pageSize || state.pageSize,
        }
    }

    state = {
        current: this.props.defaultCurrent || 1,
        pageSize: this.props.defaultPageSize || 10,
        currentInputVaule: '',
    }

    // constructor(props, ...args) {
    //     super(props, ...args);

    //     this.state = {
    //         current: props.current || props.defaultCurrent || 1,
    //         pageSize: props.pageSize || props.defaultPageSize || 10,
    //     };
    // }

    // componentWillReceiveProps(props) {

    //     if (!isUndefined(props.current)) {
    //         this.setState({
    //             current: props.current
    //         });
    //     }
    //     if (!isUndefined(props.pageSize)) {
    //         this.setState({
    //             pageSize: props.pageSize
    //         });
    //     }
    // }

    toPage(num, fromJumper) {
        const props = this.props;
        const { current } = this.state;

        if (num === current) return;

        const pageCount = this.getTotalPages();

        num = Math.max(Math.min(num, pageCount), 1);

        if (!('current' in props)) {
            this.setState({
                current: num,
                currentInputVaule: '',
            });
        } else if (fromJumper) {
            this.setState({
                currentInputVaule: '',
            });
        }

        if (props.onChange) props.onChange(num);
    }

    prevPage() {
        let current = this.state.current;

        this.toPage(--current);
    }

    nextPage() {
        let current = this.state.current;

        this.toPage(++current);
    }

	/**
	 * 获取总页数
	 */
    getTotalPages(pageSize = this.state.pageSize) {
        return Math.max(Math.ceil(this.props.total / pageSize), 1);
    }
	/**
	 * 获取当前页码的样式
	 */
    getPageItemCls(pn) {
        const { prefixCls } = this.props;
        const { current } = this.state;
        const pageCount = this.getTotalPages();

        return classNames({
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-first`]: pn == 1,
            [`${prefixCls}-item-last`]: pn == pageCount,
            [`${prefixCls}-item-active`]: current == pn,
        });
    }

    handlePageSizeChange = (pageSize) => {
        pageSize = parseInt(pageSize);

        const props = this.props;
        const { onPageSizeChange } = props;
        const { current } = this.state;
        const totalPages = this.getTotalPages(pageSize);

        const newCurrent = current > totalPages ? totalPages : current;

        if (!('pageSize' in props)) {
            this.setState({
                pageSize
            });
        }

        if (!('current' in props)) {
            this.setState({
                current: newCurrent,
                currentInputValue: ''
            });
        }

        if (onPageSizeChange) onPageSizeChange(newCurrent, pageSize);
    }

    renderPagination(key) {
        //  this.state.current = this.state.current < 1 ? 1 : this.state.current;

        const { pageSize, current } = this.state;
        const pageNumber = current;
        const { total, prefixCls, pageRange, itemRender, showPrevMore, showNextMore } = this.props;
        const pageCount = this.getTotalPages();
        const p = ~~(pageRange / 2);
        const prevPage = pageNumber - 1;
        const nextPage = pageNumber + 1;

        const toPage = (pn) => {
            return () => this.toPage(pn);
        }

        const _itemRender = (pn) => {
            return itemRender ? itemRender(pn) : pn;
        };

        const loopPage = function () {
            const list = [];
            let end = Math.min(pageNumber + p, pageCount - 1);
            const start = Math.max(end - pageRange + 1, 2);

            list.push(
                <a
                    key={`${key}_1`}
                    className={this.getPageItemCls(1)}
                    onClick={toPage(1)}
                >
                    {_itemRender(1)}
                </a>
            );

            list.push(
                showPrevMore && start > 2
                    ?
                    <span
                        key={`${key}_prev`}
                        className={`${prefixCls}-item ${prefixCls}-item-more`}
                    >
                        ...
                     </span> :
                    null
            );

            const cpn = end - start + 1;

            if (cpn < pageRange) {
                end = Math.min(pageCount - 1, end + pageRange - cpn);
            }

            for (let page = start; page <= end; page++) {
                list.push(
                    <a
                        key={`${key}_${page}`}
                        className={this.getPageItemCls(page)}
                        onClick={toPage(page)}
                    >
                        {_itemRender(page)}
                    </a>
                )
            }

            list.push(
                showNextMore && end < pageCount - 1 ?
                    <span
                        key={`${key}_next`}
                        className={`${prefixCls}-item ${prefixCls}-item-more`}
                    >
                        ...
                    </span> :
                    null
            );

            list.push(
                pageCount > 1 ?
                    <a
                        key={`${key}_${pageCount}`}
                        className={this.getPageItemCls(pageCount)}
                        onClick={toPage(pageCount)}
                    >
                        {_itemRender(pageCount)}
                    </a> :
                    null
            );

            return list;
        }

        return loopPage.call(this);
    }

    renderLayoutTotal(key) {
        const { prefixCls, totalRender, total } = this.props;
        const { current, pageSize } = this.state;

        return (
            <span
                key={key}
                className={`${prefixCls}-total-text`}
            >
                {totalRender(total, current, pageSize)}
            </span>
        );
    }

    renderLayoutSizes(key) {
        const {
            prefixCls,
            pageSizeOptions,
            pageSizeOptionRender,
            small,
            selectComponent: Select
        } = this.props;
        const list = pageSizeOptions.map(v => {
            return {
                label: pageSizeOptionRender(v),
                value: v
            }
        });

        return (
            <span key={key} className={`${prefixCls}-pagesize`}>
                <Select
                    options={list}
                    size={small ? 'small' : 'default'}
                    value={this.state.pageSize}
                    onChange={this.handlePageSizeChange}
                    className={`${prefixCls}-changer`}
                />
            </span>
        );
    }
    renderLayoutPrev(key) {
        const { prefixCls, prevBtnRender } = this.props;
        const { current } = this.state;
        const btnCls = classNames({
            [`${prefixCls}-btn`]: true,
            [`${prefixCls}-prev`]: true,
            [`${prefixCls}-btn-disabled`]: current == 1
        });

        return <a
            key={key}
            className={btnCls}
            onClick={
                () => this.prevPage()
            }
        >
            {
                prevBtnRender()
            }
        </a>;
    }
    renderLayoutPager(key) {
        return this.renderPagination(key);
    }
    renderLayoutNext(key) {
        const { prefixCls, nextBtnRender } = this.props;
        const { current } = this.state;
        const totalPages = this.getTotalPages();
        const btnCls = classNames({
            [`${prefixCls}-btn`]: true,
            [`${prefixCls}-next`]: true,
            [`${prefixCls}-btn-disabled`]: totalPages == current
        });

        return <a
            key={key}
            className={btnCls}
            onClick={() => this.nextPage()}>
            {nextBtnRender()}
        </a>;
    }
    renderLayoutJumper(key) {
        const { prefixCls, jumperRender } = this.props;
        const { currentInputVaule } = this.state;

        const onInputChange = (value) => {
            this.setState({
                currentInputVaule: value
            });
        }

        const onPressEnter = () => {
            const value = parseInt(currentInputVaule);

            if (!value || value < 1) {
                this.setState({
                    currentInputVaule: ''
                });
            } else {
                this.toPage(value, true);
            }
        }

        const jumperProps = {
            className: `${prefixCls}-jumper`,
            value: currentInputVaule,
            onChange: (e) => onInputChange(e.target.value),
            onKeyDown: (e) => e.keyCode === 13 && onPressEnter()
        }

        const jumper = (
            <input
                key="jumper_input"
                {...jumperProps}
            />
        );

        return (
            <span key={key} className={`${prefixCls}-quick-jumper`}>
                {
                    jumperRender ?
                        jumperRender(jumperProps) :
                        ['跳至', jumper, '页']
                }
            </span>
        );
    }

    renderCustomRender(layout, key) {
        const { prefixCls, total } = this.props;
        const { current, pageSize } = this.state;

        const props = {
            prefixCls,
            total,
            current,
            pageSize
        }

        return (
            <span key={key}>
                {layout(props)}
            </span>
        );
    }

    render() {
        const { prefixCls, className, layout, small, total } = this.props;

        const classes = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-sm`]: small,
        }, className);

        return (
            <div className={classes}>
                {layout.map((layout, key) => {
                    switch (layout) {
                        case 'total':
                            return this.renderLayoutTotal(key);
                        case 'sizes':
                            return this.renderLayoutSizes(key);
                        case 'prev':
                            return this.renderLayoutPrev(key);
                        case 'pager':
                            return this.renderLayoutPager(key);
                        case 'next':
                            return this.renderLayoutNext(key);
                        case 'jumper':
                            return this.renderLayoutJumper(key);
                        default:
                            if (typeof layout !== 'function') return null;

                            return this.renderCustomRender(layout, key);

                    }
                })}
            </div>
        );
    }

}
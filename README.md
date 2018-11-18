# react-widget-pagination

## Install

`npm install --save react-widget-pagination`


## Options

```
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

```

## Useage

```

<Pagination
                    total={1000}
                    style={{
                        width: 260,
                        height: 300
                    }}
                />

```
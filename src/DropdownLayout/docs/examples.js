export const simple = `
<DropdownLayout
     options={[
        { id: 1, value: 'Option 1'},
        { id: 2, value: 'Option 2'},
        { id: 3, value: 'Option 3'},
        { id: 4, value: 'Option 4 is disabled', disabled: true },
        ]}
      visible
      inContainer
/>
`;

export const maxHeight = `
  <DropdownLayout
    options={[
        { id: 1, value: 'Option 1'},
        { id: 2, value: 'Option 2'},
        { id: 3, value: 'Option 3'},
        { id: 4, value: 'Option 4'},
        { id: 5, value: 'Option 5'},
        { id: 6, value: 'Option 6'},
        { id: 7, value: 'Option 7'},
        { id: 8, value: 'Option 8'},
        { id: 9, value: 'Option 9'},
        { id: 10, value: 'Option 10'}
    ]}
    visible
    inContainer
    maxHeightPixels="170px"
  />;
`;

export const headerFooter = `
  <DropdownLayout
    options={[
      { id: 1, value: 'Option 1' },
      { id: 2, value: 'Option 2' },
      { id: 3, value: 'Option 3' },
      { id: 4, value: 'Option 4' },
      { id: 5, value: 'Option 5' },
      { id: 6, value: 'Option 6' },
      { id: 7, value: 'Option 7' },
      { id: 8, value: 'Option 8' },
      { id: 9, value: 'Option 9' },
      { id: 10, value: 'Option 10' },
    ]}
    fixedHeader={<ListItemAction title="Fixed Header" />}
    fixedFooter={<ListItemAction title="Fixed Footer" />}
    maxHeightPixels="234px"
    visible
    inContainer
  />
`;

export const infiniteScroll = `
class InfiniteScrollExample extends React.Component {
    total = 300;
    itemsPerPage = 15;

    state= { hasMore: true, options: [] };

    componentDidMount() {
        this.generateData();
    }

    generateOption = id => ({ id, value: 'Option ' + id });

    generateData = () => {
        const newOptions = [];
        const { options } = this.state;

        for (let i = 0; i < this.itemsPerPage; i++) {
          newOptions.push(this.generateOption(options.length + i));
        }

        this.setState({ options: options.concat(newOptions) });
    };

    loadMoreData = () => {
      const { options } = this.state;
        if (options.length >= this.total) {
            this.setState({ hasMore: false });
        } else {
            this.generateData();
        }
    };

    loadMore = () => setTimeout(this.loadMoreData, 1000);

    render() {
    const { options, hasMore } = this.state;

    return (<DropdownLayout
                infiniteScroll
                visible
                inContainer
                hasMore={hasMore}
                loadMore={this.loadMore}
                options={options}
            />
        );
     }
   }
`;

export const groups = `
  <DropdownLayout
    options={[
    listItemSectionBuilder({
        id: 0,
        type: 'subheader',
        title: 'Group 1',
      }),
      { id: 1, value: 'Option 1' },
      { id: 2, value: 'Option 2' },
      listItemSectionBuilder({
        id: 3,
        type: 'divider',
      }),
      { id: 4, value: 'Option 3' },
    ]}
    visible
    inContainer
  />
`;

export const functionOptions = `() => {

const setTextSkin = ({selected, hovered, disabled }) =>
    selected && 'error' || hovered && 'premium' || disabled &&  'disabled' || 'standard';

const customBuilderFunction = ({
  id,
  title,
  disabled,
}) => ({
  id,
  disabled,
  overrideStyle: true,
  value: props =>
   <Text
      weight="bold"
      children={title}
      skin={setTextSkin(props)}
      {...props}
    />
});

  const options = [
    customBuilderFunction({ id: 1, title: 'Custom Option 1'}),
    customBuilderFunction({ id: 2, title: 'Custom Option 2', disabled: true}),
    listItemActionBuilder({
        id: 3,
        prefixIcon: <Icons.Edit />,
        title: 'Builder Option 3',
      }),,
    { id: 4, value: 'Option 4'}
  ];

  return (<DropdownLayout inContainer visible options={options} />);
};
`;

export const controlled = `() => {

const [ selectedId , setSelectedId] = React.useState(1);

const options = [
        { id: 1, value: 'Option 1'},
        { id: 2, value: 'Option 2'},
        { id: 3, value: 'Option 3'},
        { id: 4, value: 'Option 4'},
];

return <DropdownLayout
            inContainer
            visible
            options={options}
            selectedId={selectedId}
            onSelect={({id}) => setSelectedId(id)}
       />
}
`;

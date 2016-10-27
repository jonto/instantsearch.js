import React, {PropTypes, Component} from 'react';
import pick from 'lodash/pick';

import themeable from '../core/themeable';
import translatable from '../core/translatable';

import List from './List';
import Link from './Link';

import theme from './Menu.css';

class Menu extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    applyTheme: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    createURL: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })),
    currentRefinement: PropTypes.string,
    showMore: PropTypes.bool,
    limitMin: PropTypes.number,
    limitMax: PropTypes.number,
  };

  renderItem = (item, selected) => {
    const {refine, createURL, applyTheme, translate} = this.props;
    const value = selected ? null : item.value;
    return (
      <Link
        {...applyTheme('itemLink', 'itemLink', selected && 'itemLinkSelected')}
        onClick={refine.bind(null, value)}
        href={createURL(value)}
      >
        <span {...applyTheme('itemLabel', 'itemLabel', selected && 'itemLabelSelected')}>
          {item.value}
        </span>
        {' '}
        <span {...applyTheme('itemCount', 'itemCount', selected && 'itemCountSelected')}>
          {translate('count', item.count)}
        </span>
      </Link>
    );
  };

  render() {
    return (
      <List
        renderItem={this.renderItem}
        selectedItems={[this.props.currentRefinement]}
        {...pick(this.props, [
          'applyTheme',
          'translate',
          'items',
          'showMore',
          'limitMin',
          'limitMax',
        ])}
      />
    );
  }
}

export default themeable(theme)(
  translatable({
    showMore: extended => extended ? 'Show less' : 'Show more',
    count: count => count.toLocaleString(),
  })(Menu)
);
import React, { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import defaultTheme from './BusinessList.scss';
import { List, ListItem, ListSubHeader } from 'react-toolbox/components/list';
import { fill, find } from 'lodash';
import sizeMe from 'react-sizeme';
import { Avatar, FontIcon } from 'react-toolbox/components';

@themr('BusinessList', defaultTheme)
class BusinessList extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      businesses: PropTypes.array,
      onChange: PropTypes.func,
      size: PropTypes.object.isRequired
    }
    
    handleClickBusiness = (businessID) => {
      const business = find(this.props.businesses, {id: businessID});
      if(business){
        this.setState({...this.state, business: business, dialogOpen:true});
      }
    }
    
    stars(rating){
      let f = Math.floor(rating);
      let r = Math.round(rating);
      let remain = f === r ? '' : f < r ? ' star_half' : ' star';
      return fill(Array(f), 'star').join(' ') + remain;
    }
    
    onListItemKeyDown = (event, id) => {
      const { onChange } = this.props;
      const keyCode = event.which || event.keyCode;
      
      // enter key acts as click
      if(keyCode === 13){
        onChange(id);
      }
    }
    
    renderResult(index, id, avatar, caption, rating, displayAddress) {
      const { theme, onChange } = this.props;
      const { width } = this.props.size;
      
      const DefaultIcon = () => (
        <svg viewBox="0 0 284 277">
          <g><path d="M141.888675,0.0234927555 C63.5359948,0.0234927555 0,63.5477395 0,141.912168 C0,204.6023 40.6554239,257.788232 97.0321356,276.549924 C104.12328,277.86336 106.726656,273.471926 106.726656,269.724287 C106.726656,266.340838 106.595077,255.16371 106.533987,243.307542 C67.0604204,251.890693 58.7310279,226.56652 58.7310279,226.56652 C52.2766299,210.166193 42.9768456,205.805304 42.9768456,205.805304 C30.1032937,196.998939 43.9472374,197.17986 43.9472374,197.17986 C58.1953153,198.180797 65.6976425,211.801527 65.6976425,211.801527 C78.35268,233.493192 98.8906827,227.222064 106.987463,223.596605 C108.260955,214.426049 111.938106,208.166669 115.995895,204.623447 C84.4804813,201.035582 51.3508808,188.869264 51.3508808,134.501475 C51.3508808,119.01045 56.8936274,106.353063 65.9701981,96.4165325 C64.4969882,92.842765 59.6403297,78.411417 67.3447241,58.8673023 C67.3447241,58.8673023 79.2596322,55.0538738 106.374213,73.4114319 C117.692318,70.2676443 129.83044,68.6910512 141.888675,68.63701 C153.94691,68.6910512 166.09443,70.2676443 177.433682,73.4114319 C204.515368,55.0538738 216.413829,58.8673023 216.413829,58.8673023 C224.13702,78.411417 219.278012,92.842765 217.804802,96.4165325 C226.902519,106.353063 232.407672,119.01045 232.407672,134.501475 C232.407672,188.998493 199.214632,200.997988 167.619331,204.510665 C172.708602,208.913848 177.243363,217.54869 177.243363,230.786433 C177.243363,249.771339 177.078889,265.050898 177.078889,269.724287 C177.078889,273.500121 179.632923,277.92445 186.825101,276.531127 C243.171268,257.748288 283.775,204.581154 283.775,141.912168 C283.775,63.5477395 220.248404,0.0234927555 141.888675,0.0234927555" /></g>
        </svg>
      );
      
      if(width < 600){
        return (
          <ListItem
            key={`res_${index}`}
            avatar={<Avatar title={caption} image={avatar} theme={theme} /> || <DefaultIcon />}
            avatarAlt={`${caption} image`}
            caption={caption}
            legend={<FontIcon ariaLabel={`, ${rating} star rating`} value={this.stars(rating)} className={theme.stars}/>}
            theme={theme}
            onClick={() => onChange(id)}
            onKeyPress={(e) => this.onListItemKeyDown(e, id)}
          />
        );
      }
      
      return (
        <ListItem
          key={`res_${index}`}
          avatar={<Avatar title={caption} image={avatar} theme={theme} /> || <DefaultIcon />}
          avatarAlt={`${caption} image`}
          caption={caption}
          legend={displayAddress}
          rightIcon={<FontIcon ariaLabel={`, ${rating} star rating`} value={this.stars(rating)}/>}
          theme={theme}
          onClick={() => onChange(id)}
          onKeyPress={(e) => this.onListItemKeyDown(e, id)}
        />
      );
    }
  
    render() {
      const { businesses } = this.props;
      return (
        <List selectable ripple tabIndex="0">
          <ListSubHeader caption="Search Results:" />
          {
            businesses ? 
            businesses.map((r, i) => this.renderResult(i, r.id, r.thumb, r.name, r.rating, r.displayAddress)) :
            <span></span>
          }
        </List>
      );
    }
}
export default sizeMe({})(BusinessList);

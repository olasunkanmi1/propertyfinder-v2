import Router from "next/router";
import { getFilterValues } from "../filteringOptions";
import { SetterOrUpdater } from "recoil";
import { ILoadingState, IFilterValues } from "@types";

export const findProperties = (filterValues: IFilterValues, setLoading: SetterOrUpdater<ILoadingState>) => {
    const path = Router.pathname;
    const { query } = Router;
  
    const values = getFilterValues(filterValues);
  
    values.forEach(({value, name}) => {
      query.page = []; //set page to first when any filter option is selected

      if (value && filterValues[name]) { //allow url to only show selected query. not all.
        if(value !== 'any' && value !== '0') {
          query[name] = value;
        } else {
          query[name] = [];
        }
      }
    });
  
    Router.push({ pathname: path, query }); //pathname:path, query:query
    Router.events.off('routeChangeComplete', () =>
    setLoading(loading => ({
         ...loading,
         propertiesLoading: false
     }))
    )
};
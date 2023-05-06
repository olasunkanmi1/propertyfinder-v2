import Router from "next/router";
import { getFilterValues } from "../filteringOptions";
import { SetterOrUpdater } from "recoil";
import { ILoadingState } from "../../states";
import { IFilterValues } from "../../types";

export const findProperties = (filterValues: IFilterValues, setLoading: SetterOrUpdater<ILoadingState>) => {
    const path = Router.pathname;
    const { query } = Router;
  
    const values = getFilterValues(filterValues);
  
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) { //allow url to only show selected query. not all.
        if(item.value !== 'any') {
          query[item.name] = item.value;
        } else {
          query[item.name] = [];
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
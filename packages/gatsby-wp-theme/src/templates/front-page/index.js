import React from "react";
import Page from "../../components/page";
import { isEmpty } from 'lodash';
import Layout from "../../components/layout";

import SEO from "../../components/seo";
import { getOgImage } from "../../utils/functions";

const FrontPage = ( props ) => {

	const {
		      pageContext: {
			      page: { title, seo, uri }
		      }
	      } = props;

		  
	return (
		<Layout>
			{
				! isEmpty( props.pageContext ) ? (
					<>
						<SEO
							title={ title }
							seoData={ seo }
							uri={ uri }
							header={ { siteTitle: 'Gatsby WooCommerce Theme' } }
							openGraphImage={ getOgImage( seo ) }
						/>
						<Page data={ props.pageContext?.page }/>
					</>
				) : (
					<div>Something went wrong</div>
				)
			}
		</Layout>
	)
};
export default FrontPage;


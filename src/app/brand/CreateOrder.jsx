import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from './Layout';
import OrderOptions from './create-order/OrderOptions';
import BulkOrderForm from './create-order/BulkOrderForm';
import BudgetBasedForm from './create-order/BudgetBasedForm';
import InfluencerSelectionForm from './create-order/InfluencerSelectionForm';
import CustomizedOfferForm from './create-order/CustomizedOfferForm';

const CreateOrder = () => {
  const Router = useRouter();
  const { option } = Router.query; // Get option from query parameters

  useEffect(() => {
    // Ensure option exists and is valid, otherwise redirect
    if (option && ![ 'BulkOrderForm', 'budget-based', 'influencer-selection', 'customized-offer'].includes(option)) {
      Router.push('/brand/create-order');
    }
  }, [option, Router]);

  const renderForm = () => {
    switch(option) {
      case 'BulkOrderForm':
        return <BulkOrderForm />;
      case 'budget-based':
        return <BudgetBasedForm />;
      case 'influencer-selection':
        return <InfluencerSelectionForm />;
      case 'customized-offer':
        return <CustomizedOfferForm />;
      default:
        return <OrderOptions />;
    }
  };

  return (
    <Layout id="create-order">
      {renderForm()}
    </Layout>
  );
};

export default CreateOrder;

"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Updated imports
import Layout from '@/app/brand/Layout';
import OrderOptions from '@/app/brand/create-order/OrderOptions';
import BulkOrderForm from '@/app/brand/create-order/BulkOrderForm';
import BudgetBasedForm from '@/app/brand/create-order/BudgetBasedForm';
import InfluencerSelectionForm from '@/app/brand/create-order/InfluencerSelectionForm';
import CustomizedOfferForm from '@/app/brand/create-order/CustomizedOfferForm';

const CreateOrder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const option = searchParams.get('option'); // Get option from search params

  useEffect(() => {
    // Ensure option exists and is valid, otherwise redirect
    if (option && !['BulkOrderForm', 'budget-based', 'influencer-selection', 'customized-offer'].includes(option)) {
      router.push('/brand/create-order');
    }
  }, [option, router]);

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
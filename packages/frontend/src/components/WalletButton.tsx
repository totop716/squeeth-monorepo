import React from 'react'
import Button from '@material-ui/core/Button'
import { useWallet } from '../context/wallet';
import { useMemo } from 'react';
import { Networks } from '../types';

const WalletButton: React.FC = () => {
  const { selectWallet, connected, address, networkId } = useWallet()

  const shortAddress = useMemo(() =>
    address ? address.slice(0, 8) + '…' + address.slice(address.length - 8, address.length) : ''
    , [address])

  const Circle = ({ networkId }: { networkId: Networks }) => {
    const color = (networkId === Networks.MAINNET ? '#05b169' : '#8F7FFE')
    return (
      <div
        style={{
          marginRight: '1rem',
          display: 'inline-block',
          backgroundColor: color,
          borderRadius: '50%',
          width: '.6rem',
          height: '.6rem',
        }}
      />
    );
  };

  return (
    <div>
      {!connected ? (
        <Button variant="contained" color="primary" onClick={selectWallet}>
          Connect wallet
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={selectWallet}>
          <Circle networkId={networkId} />
          {shortAddress}
        </Button>
      )}
    </div>
  )
};

export default WalletButton
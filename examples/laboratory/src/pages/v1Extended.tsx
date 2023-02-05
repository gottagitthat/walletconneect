import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import {
  arbitrum,
  avalanche,
  bsc,
  evmos,
  fantom,
  gnosis,
  iotex,
  mainnet,
  metis,
  optimism,
  polygon,
  zkSync
} from 'wagmi/chains'
import WagmiWeb3ModalWidget from '../components/WagmiWeb3ModalWidget'
import { bootstrapSentry } from '../utilities/BootstrapSentry'
import { getProjectId } from '../utilities/EnvUtil'

bootstrapSentry()
// Configure wagmi and web3modal
const projectId = getProjectId()
const chains = [
  mainnet,
  avalanche,
  gnosis,
  arbitrum,
  polygon,
  bsc,
  fantom,
  zkSync,
  optimism,
  evmos,
  iotex,
  metis
]
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ version: '1', projectId, appName: 'web3Modal', chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

// Example
export default function v1ExtendedPage() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <WagmiWeb3ModalWidget />
      </WagmiConfig>

      <Web3Modal ethereumClient={ethereumClient} projectId={projectId} themeColor="purple" />
    </>
  )
}

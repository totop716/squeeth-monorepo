import BigNumber from 'bignumber.js'

import { BIG_ZERO } from '../constants/'
import { swaps_swaps } from '../queries/uniswap/__generated__/swaps'

type ShortPnLParams = {
  wethAmount: BigNumber
  buyQuote: BigNumber
  ethPrice: BigNumber
}

export function calcUnrealizedPnl({ wethAmount, buyQuote, ethPrice }: ShortPnLParams) {
  if (
    wethAmount.isEqualTo(0) ||
    !wethAmount.isFinite() ||
    buyQuote.isEqualTo(0) ||
    !buyQuote.isFinite() ||
    ethPrice.isEqualTo(0) ||
    !ethPrice.isFinite()
  ) {
    return new BigNumber(0)
  }
  return wethAmount.minus(buyQuote).multipliedBy(ethPrice)
}

export async function calcDollarShortUnrealizedpnl(
  swaps: swaps_swaps[],
  isWethToken0: boolean,
  getBuyQuote: (squeethAmt: BigNumber) => {},
  ethPrice: BigNumber,
  ethPriceMap: { [key: string]: number },
) {
  const result = swaps?.length
    ? swaps?.map(async (item) => {
        const squeethAmt = new BigNumber(isWethToken0 ? item.amount1 : item.amount0)
        const wethAmt = new BigNumber(isWethToken0 ? item.amount0 : item.amount1)
        const buyQuote = await getBuyQuote(squeethAmt.abs())

        return {
          wethAmt: wethAmt.abs(),
          squeethAmt: squeethAmt.abs(),
          buyQuote,
          timestamp: item.timestamp,
        }
      })
    : []

  const data = await Promise.all(result)

  const { sell, buy } = data.reduce(
    (acc, curr: any) => {
      const time = new Date(Number(curr.timestamp) * 1000).setUTCHours(0, 0, 0) / 1000

      if (curr.squeethAmt.isPositive()) {
        acc.sell = !curr.buyQuote?.amountIn?.isEqualTo(0)
          ? acc.sell.plus(
              curr.wethAmt.times(ethPrice).minus(curr.buyQuote?.amountIn?.times(new BigNumber(ethPriceMap[time]))),
            )
          : BIG_ZERO
      } else {
        acc.buy = !curr.buyQuote?.amountIn?.isEqualTo(0)
          ? acc.buy.plus(
              curr.wethAmt.times(ethPrice).minus(curr.buyQuote?.amountIn?.times(new BigNumber(ethPriceMap[time]))),
            )
          : BIG_ZERO
      }
      return acc
    },
    { sell: BIG_ZERO, buy: BIG_ZERO },
  )

  return sell.minus(buy).toFixed(2)
}

export async function calcDollarLongUnrealizedpnl(
  swaps: swaps_swaps[],
  isWethToken0: boolean,
  getSellQuote: (squeethAmt: BigNumber) => {},
  ethPrice: BigNumber,
  ethPriceMap: { [key: string]: number },
) {
  const result = swaps?.length
    ? swaps?.map(async (item) => {
        const squeethAmt = new BigNumber(isWethToken0 ? item.amount1 : item.amount0)
        const wethAmt = new BigNumber(isWethToken0 ? item.amount0 : item.amount1)
        const sellQuote = await getSellQuote(squeethAmt.abs())

        return {
          wethAmt: wethAmt.abs(),
          squeethAmt: squeethAmt.abs(),
          sellQuote,
          timestamp: item.timestamp,
        }
      })
    : []

  const data = await Promise.all(result)

  const { buy, sell } = data.reduce(
    (acc, curr: any) => {
      const time = new Date(Number(curr.timestamp) * 1000).setUTCHours(0, 0, 0) / 1000

      if (curr.squeethAmt.isNegative()) {
        acc.buy = !curr.sellQuote?.amountOut?.isEqualTo(0)
          ? acc.buy.plus(
              curr.sellQuote?.amountOut.times(ethPrice).minus(curr.wethAmt.times(new BigNumber(ethPriceMap[time]))),
            )
          : BIG_ZERO
      } else {
        acc.sell = !curr.sellQuote?.amountOut?.isEqualTo(0)
          ? acc.sell.plus(
              curr.sellQuote?.amountOut?.times(ethPrice).minus(curr.wethAmt.times(new BigNumber(ethPriceMap[time]))),
            )
          : BIG_ZERO
      }
      return acc
    },
    { buy: BIG_ZERO, sell: BIG_ZERO },
  )

  return buy.minus(sell).toFixed(2)
}

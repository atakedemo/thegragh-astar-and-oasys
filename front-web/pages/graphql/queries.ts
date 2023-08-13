//import { gql } from "apollo-boost";
import { gql } from '@apollo/client'

const GET_TRANSFERS = gql
`
query AllTransgers {
    transfers {
        id
        from
        to
        tokenId
    }
}
`

export default GET_TRANSFERS;
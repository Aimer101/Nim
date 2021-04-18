

class Nim {
    constructor(height){
        this.player = 0
        this.winner = null
        this.piles = this.arr(height)

    }

    arr(height){
        var a = []
        for(var i = 0; i < height; i++){
            a.push(i+1+i)
        }
        return a
    }

    static available_action(piles){
       var actions = []
       const len = piles.length

       for(var i = 0; i < len; i++){
           if(piles[i] === 0){
               continue
           }
           for(var j = 1; j <= piles[i]; j++){
               actions.push([i,j])
           }
       }
       return actions
    }

    static other_player(player){
        if(player === 0){
            return 1
        }
        return 0
    }

    switch_player(){
        this.player = Nim.other_player(this.player)
    }

    static isFinish(item){
        if(item === 0){
        return true
        }

    }

    move(action){

        var pile = action[0]
        
        var count = action[1]


        this.piles[pile] -= count
        this.switch_player()


        if(this.piles.every(Nim.isFinish)){
            this.winner = this.player
        }

    }

}

class NimAi{
    constructor(alpha = 0.5){
        this.q = {}
        this.alpha = alpha
    }

    update(old_state,action, new_state, reward){
        
        var old = this.get_q_value(old_state, action)
        var best_future = this.best_future_reward(new_state)
        this.update_q_value(old_state, action, old, reward, best_future)

    }

    get_q_value(state, action){
        
        if(this.q[`[${state}, ${action}]`]){
            return this.q[`[${state}, ${action}]`]
        }
        return 0

    }

    update_q_value(state,action, old_q, reward, future_rewards){
        var new_value_estimate = reward + future_rewards
        this.q[`[${state}, ${action}]`] = old_q + this.alpha*(new_value_estimate - old_q)  
    }

    best_future_reward(state){
        var possible_action = Nim.available_action(state)

        if(possible_action.length === 0){
            return 0
        }

        var len = possible_action.length

        var reward = 0

        for(var i = 0; i <len; i++ ){
            if(this.q[`[${state}, ${possible_action[i]}]`] >= reward){
                reward = this.q[`[${state}, ${possible_action[i]}]`]
            }
        }

        return reward


    }

    choose_action(state, ran){


        var possible_action = Nim.available_action(state)

        var len = possible_action.length
        
        /* If Q object is none, return random action */
        if(Object.keys(this.q).length === 0){
            return possible_action[Math.floor(Math.random() * (len - 1))]
        }


        var reward = -1
        var best_action = null

        for(var i = 0; i <len; i++ ){

            if(this.q[`[${state}, ${possible_action[i]}]`] >= reward){
                reward = this.q[`[${state}, ${possible_action[i]}]`]
                best_action = possible_action[i]
            }
        }

        /* If no best action is found, return a random action */

        if(best_action == null){
            
            best_action = possible_action[Math.floor(Math.random() * (len - 1))]
        }

        /* If ran is true, with probability of 0.1 return random action, else best action */
        if(ran === true){
            var isRandom = Math.floor(Math.random() * 10)
            

            if(isRandom === 0){
            


                return possible_action[Math.floor(Math.random() * (len - 1))]
            }
        }

        return best_action


    }
}

function train(n, height){
    var player = new NimAi()

    for(var i = 0; i < n; i++){
        console.log(`AI Finish Train ${i+1} times`)
    
        var game = new Nim(height)

        var last = {'state': null, 'action': null}

        while(true){
            var state = [...game.piles]
            var action = player.choose_action(game.piles, true)

            game.move(action)
            
            var new_state = [...game.piles]
            
            if(game.winner != null){
                player.update(state, action, new_state, -1)
                
                player.update(
                    last['state'],
                    last['action'],
                    new_state,
                    1
                )
                
                break
            }
            else{
                
                player.update(
                    state,
                    action,
                    new_state,
                    0

                )
            last['state'] = state
            last['action'] = action
            }

        } 
    
    
    }
    console.log('Done Training') 
    console.log(player.q) 
 
    return player

}

function ai_move(ai, arr){

        var next = ai.choose_action(arr, false)
        return next      
}


export {train, ai_move, Nim}












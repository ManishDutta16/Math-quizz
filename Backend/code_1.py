import random
import math 
def misslen():
    size = random.randint(2, 5)
    vars = []
    for i in range(size):
       vars.append(random.randint(1, 4))
    # symbols = ['+', '-', '*', '/','^']
    symbols = ['+', '-', '*', '/', '^', 'log', 'sin', 'cos', 'sqrt']
    brackets = "("*(size-1)
    ques = f"what is the value of {brackets}{vars[0]}"
    ans = vars[0]
    for i in range(1, size):
        curr_symbol =  random.choice(symbols)
        ques += curr_symbol
        ques += str(vars[i])+")"
        curr_ans = ans
        # match curr_symbol:
        #     case '+':
        #         curr_ans += vars[i]
            
        #     case '-':
        #         curr_ans -= vars[i]
            
        #     case '*':
        #         curr_ans *= vars[i]
                
        #     case '/':
        #         curr_ans /= vars[i]
                
        #     case '^':
        #         curr_ans **= vars[i]     
        
        if curr_symbol == '+':
            curr_ans += vars[i]
        
        elif curr_symbol == '-':
            curr_ans -= vars[i]
        
        elif curr_symbol == '*':
            curr_ans *= vars[i]
            
        elif curr_symbol == '/':
            curr_ans /= vars[i]
            
        elif curr_symbol == '^':
            curr_ans **= vars[i]  
             
        elif curr_symbol == 'log':
            if curr_ans <= 0:
                continue
            curr_ans = math.log(int(curr_ans), vars[i])  
        
        elif curr_symbol == 'sin':
            curr_ans = math.sin(curr_ans)  
        
        elif curr_symbol == 'cos':
            curr_ans = math.cos(curr_ans)  
        
        elif curr_symbol == 'sqrt':
            if curr_ans < 0:
                continue
            curr_ans = math.sqrt(curr_ans)  
        
        curr_ans = round(curr_ans, 2)
        ans = curr_ans

        options = [
            ans + random.randint(1, abs(int(ans))+1),
            ans + random.randint(2, abs(int(ans))+2),
            ans + random.randint(3, abs(int(ans))+3),
            ans
        ]   
        
        random.shuffle(options)
        if options[0] == ans:
            correct_option_key = "optionA"
        elif options[1] == ans:
            correct_option_key = "optionB"
        elif options[2] == ans:
            correct_option_key = "optionC"
        else:
            correct_option_key = "optionD"

        data_to_be_transferred = {
            "question": ques,
            "optionA": options[0],
            "optionB": options[1],
            "optionC": options[2],
            "optionD": options[3],
            "correctOption": correct_option_key
        } 
    return(data_to_be_transferred)
print(misslen())
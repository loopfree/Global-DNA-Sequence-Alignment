import numpy as np

def max_of_3(a, b, c): 
    list = [a, b, c] 
    return max(list) 

# skema scoring
match = 1 # add
miss = 1 # minus
gap = 2 # minus

seq1 = input()
seq2 = input()

l1 = len(seq1)
l2 = len(seq2)

m = []

for i in range(l2+1):
    temp = []
    for j in range(l1+1):
        # fill gap
        if i==0:
            temp.append(-gap*(j))
        elif j==0:
            temp.append(-gap*(i))
        # make it blank
        else:
            temp.append(0)
            
            
    m.append(temp)

# sequence update
new1 = " " + seq1
new2 = " " + seq2

# initialize
print("Before Filling")
for i in m:
    print(i)

for i in range(l2+1):
    for j in range(l1+1):
        if not(i==0 or j==0):
            score = 0
            left_val = m[i][j-1] - gap
            top_val = m[i-1][j] - gap
            diag_val = m[i-1][j-1]
            if new1[j]==new2[i]:
                diag_val += match
            else:
                diag_val -= miss
            score = max_of_3(left_val, top_val, diag_val)
            m[i][j] = score
    
# After Algorithm
print("After Filling")
for i in m:
    print(i)